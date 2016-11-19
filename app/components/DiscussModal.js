import React, { Component } from 'react';
import {closeDiscussModal} from '../actions';

const mapStateToProps = ({selectedJob}) => ({selectedJob});
const mapDispatchToProps = dispatch => ({
  close:   ()   => dispatch(closeDiscussModal())
});

export const DiscussModal = props => (
    <div className="g--4">
        <input type="checkbox" id="modal-1"/>
        <label className="modal-trigger" htmlFor="modal-1">Modal Link</label>
        <div className="modal-content g--4">
            <p>Lorem ipsum dolor.</p>
        </div>
    </div>
);
export default DiscussModal;  
