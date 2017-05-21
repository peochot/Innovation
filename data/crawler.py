from collections import defaultdict
import requests
import json
import time
from lxml import etree
from pymongo import MongoClient
import pymongo
from pymongo import TEXT
from urllib.parse import urlparse
from datetime import datetime
from datetime import timedelta

def get(url,params={},level=1):

    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    response = requests.get(url, headers=headers,params=params)
    print("Getting url "+url)
    try:
        decoded = json.loads(response.text)
        return decoded
    except (ValueError, KeyError, TypeError):
        print("JSON format error")
        print("Error "+ url)
        time.sleep(3)
        if level>10:
            return None
        return get(url,level=level+1)
def getJobs():
    url="http://www.mol.fi/paikkapilotti/tpt-mobile-ws/tyopaikat"
    params = {
    'alueet': "Uusimaa",
    'englanti':"true",
    'sort':"ilmoitusnumero desc",
    'ilmoitettuPvm':"1"
    }
    return get(url,params)['response']['docs']
def getJobDetail(id):
    url="http://www.mol.fi/paikkapilotti/tpt-mobile-ws/tyopaikat/"+str(id)
    return get(url)['response']['docs']

def getLocation(name):
    url="https://www.fonecta.fi/haku?what="+name+"&sort=RELEVANCE&latitude=&longitude=&autosuggested=false"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    time.sleep(30)
    page = requests.get(url, headers=headers)
    tree = etree.HTML(page.text)
    print(url)
    #print(page.text)
    element2 =tree.xpath("//*[@id='search-results']/div")
    #if len(element2):
     #   link=element2[0].attrib['href']
     #   content=urlparse(link)
     #   content=content.path.replace("/kartat/", "")
     #   return [float(n) for n in content.split(',')]

    #element = tree.xpath('//*[@id="search-results"]/div[@class="search-result list   "]')
    for company in element2 :
        #print(company.attrib['data-name'])
        if 'data-latitude' in company.attrib and 'data-longitude' in company.attrib:
            return [float(company.attrib['data-latitude']),float(company.attrib['data-longitude'])]


def main():
    dict = {'ilmoitusnumero': 'mol_id',
            'kunta': 'region',
            'tehtavanimi': 'title',
            'ilmoituspaivamaarateksti': 'created',
            'tyonantajanNimi': 'company',
            'kuvausteksti': 'description',
            'tyopaikanOsoite': 'address',
            'yhteystiedot': 'representative',
            'hakuPaattyy': 'expire',
            'tyonantajanWwwOsoite': 'website',
            'hakemusLahetetaan': 'apply_email',
            'palkkausteksti': 'salary',
            'tyonKestoTekstiYhdistetty':'duration'
            }
    dict= defaultdict(lambda: "trivial", dict)
    client = MongoClient('mongodb://localhost:27017/')
    db = client['cooking']
    jobsCollection = db['jobs']
    jobsCollection.create_index(
        [
            ('title', TEXT),
            ('description', TEXT),
            ('company', TEXT)
        ],
        weights={
            'title': 7,
            'description': 5,
            'company': 1
        }
    )
    companiesCollection = db['companies']
    jobsData=getJobs()
    jobs=[]
    email=""
    phone=""
    companiesCollection.create_index([('name', pymongo.DESCENDING)], unique=True)
    jobsCollection.create_index([('mol_id', pymongo.DESCENDING)], unique=True)
    for jobData in jobsData :
        job={}
        company={}
        if "yhteystiedotSahkoposti" in jobData :
            email=jobData['yhteystiedotSahkoposti'][0]
        if "yhteystiedotPuhelin" in jobData :
            phone=jobData['yhteystiedotPuhelin'][0]
        job['email']=email
        job['phone']=phone
        for key, value in jobData.items():
            job[dict[key]]=value
        #print(jobData['tyonantajanNimi'])
        companyFound=companiesCollection.find_one({'name':job['company']})
        if companyFound:
            job['coords']=companyFound['coords']
            job['cid'] = companyFound['_id']
        else :
            if 'sijainti' in jobData :
                job['coords'] = [float(n) for n in jobData['sijainti'].split(',')]
            else :
                job['coords']=getLocation(job['company'])
            if job['coords'] and len(job['coords']):
                company['name']=job['company']
                company['coords']=job['coords']
                company['reviews']=[]
                try:
                    job['cid'] = companiesCollection.insert(company)
                except :
                    print("Already existed")
        if job['coords'] is None :
            print("Error "+job['company'])
        jobDetail=getJobDetail(job['mol_id'])
        if len(jobDetail):
            jobDetail=jobDetail[0]
        for key, value in jobDetail.items():
            job[dict[key]]=value
        try:
            if "expire" in job:
                print(job["expire"])
                job["expire"] = datetime.strptime(job["expire"][:10], "%d.%m.%Y")
            else:
                job["expire"] = datetime.now()+ timedelta(days=1)
            if job["created"]:
                job["created"] = datetime.strptime(job["created"][:10], "%d.%m.%Y")

            job["last_modified"] = datetime.utcnow()
            jobsCollection.insert(job)
        except Exception as e:
            print(job["expire"])
            print("Error :",e)

if __name__ == '__main__':
    main()
   # getLocation("Oy Ajat Ltd")
