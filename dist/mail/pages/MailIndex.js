import React, { useState, useEffect } from 'react';
import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [filterBy, setFilterBy] = useState({
    txt: '',
    status: 'inbox'
  });
  useEffect(() => {
    loadMails();
  }, [filterBy]);
  function loadMails() {
    mailService.query(filterBy).then(mails => {
      setMails(mails);
    });
  }
  function handleFilterChange(ev) {
    setFilterBy(prevFilter => ({
      ...prevFilter,
      txt: ev.target.value
    }));
  }
  function setFolder(status) {
    setFilterBy(prevFilter => ({
      ...prevFilter,
      status
    }));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "container mail-index"
  }, /*#__PURE__*/React.createElement("h1", null, "Mail App"), /*#__PURE__*/React.createElement("div", {
    className: "mail-controls"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search mails...",
    value: filterBy.txt,
    onChange: handleFilterChange
  }), /*#__PURE__*/React.createElement("nav", {
    className: "mail-folders"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFolder('inbox')
  }, "Inbox"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFolder('sent')
  }, "Sent"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFolder('trash')
  }, "Trash"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFolder('draft')
  }, "Drafts"))), /*#__PURE__*/React.createElement(MailList, {
    mails: mails
  }));
}