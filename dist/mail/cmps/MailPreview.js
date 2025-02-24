export function MailPreview({
  mail
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `mail-preview ${mail.isRead ? 'read' : 'unread'}`
  }, /*#__PURE__*/React.createElement("h4", null, mail.subject), /*#__PURE__*/React.createElement("p", null, mail.body.substring(0, 50), "..."), /*#__PURE__*/React.createElement("span", {
    className: "mail-sender"
  }, mail.from));
}