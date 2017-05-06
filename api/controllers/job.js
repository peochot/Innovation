import Job from '../models/job';
import Application from '../models/application';
import Bookmark from '../models/bookmark';
import MailService from '../services/UserMail';
import libmime from 'libmime';

function list(req, res) {

    //cach ngu rat ngu , TODO : Refucktor
    const Promise = require('bluebird');
    Promise.all([
        Application.find({ owner: req.user._id }).lean().distinct('job'),
        Bookmark.find({ owner: req.user._id }).lean().distinct('job'),
        Job.getJobs(req.query).lean()
    ]).spread(function (applications, bookmarks, jobs) {
        bookmarks = bookmarks.map((bookmark) => (bookmark.toString()));
        applications = applications.map((application) => (application.toString()));

        jobs = jobs.map((job) => {
            if (bookmarks.indexOf(job._id.toString()) != -1) {
                job['bookmarked'] = true;
            } else {
                job['bookmarked'] = false;
            }

            if (applications.indexOf(job._id.toString()) != -1) {
                job['applied'] = true;
            } else {
                job['applied'] = false;
            }

            return job;
        });
        res.json({
            data: jobs
        });
    }, function (err) {
        res.status(403).json({ message: err });
    });
};

function one(req, res) {
    Job.findById(req.params.jobId)
        .then((jobData) => {
            res.json({ data: jobData })
        })
}

function ownList(req, res) {
    if (req.query.type == "application") {
        Application.find({ owner: req.user._id })
            .populate('job')
            .then((jobRefs) => {
                let jobs = [];

                jobRefs.map((jobRef) => {
                    jobs.push(jobRef.job);
                });

                res.json({ data: jobs });
            });
    } else if (req.query.type = "bookmark") {
        Bookmark.find({ owner: req.user._id })
            .populate('job')
            .then((jobRefs) => {
                let jobs = [];
                jobRefs.map((jobRef) => {
                    jobs.push(jobRef.job);
                });
                res.json({ data: jobs });
            });
    } else {
        res.json({});
    }

};

function doAction(req, res) {
    Job.findById(req.params.jobId)
        .then((job) => {
            switch (req.params.action) {
                case "apply":
                    return apply(job, req.user, req.body.letter, req.file.buffer.toString('base64'));
                case "close":
                    return close(job, req.user);
                case "bookmark":
                    return bookmark(job, req.user);
                case "unBookmark":
                    return unBookmark(job, req.user);
                default:
                    return Promise.reject("Invalid action");
            }
        })
        .then((object) => {
            res.json({ data: object });
        })
        .catch((err) => {
            res.status(400).json({ message: err });
        });
};

function applyWithFile(req, res) {
    const user = req.user;
    const fileData = req.file.buffer.toString('base64');

    if (!user.google.accessToken) {
        res.status(401).json({ message: "Account is not linked with google" });
    }
    var jobData = {};

    Job.findById(req.params.jobId)
        .then((job) => {
            jobData = job;
            return MailService.send(
                user.google.accessToken,
                "beochot@gmail.com",
                user,
                libmime.encodeWord(job.title, 'Q'),
                req.body.letter,
                "application/pdf",
                "resume.pdf",
                fileData
            );
        })
        .then((res) => {
            console.log('job', jobData);
            return Application.create({
                owner: user._id,
                job: jobData._id
            });
        })
        .then((response) => {
            console.log(response);
            res.json({ message: "ok" })
        },
        (err) => {
            console.log(err);
            res.status(403).json({ message: err });
        });
}

function apply(job, user, letter, fileData) {
    return MailService.send(
        user.google.accessToken,
        "beochot@gmail.com",
        user,
        libmime.encodeWord(job.title, 'Q'),
        letter,
        "application/pdf",
        "resume.pdf",
        fileData
    ).then((response) => {
        return Application.create({
            owner: user._id,
            job: job._id
        });
    });

}

function close(job, user) {
    return Application.remove({ job: job._id, owner: user._id });
};

function bookmark(job, user) {
    return Bookmark.create({
        owner: user._id,
        job: job._id
    });
};

function unBookmark(job, user) {
    return Bookmark.remove({ job: job._id, owner: user._id });
};

export default { list, one, ownList, doAction, applyWithFile }
