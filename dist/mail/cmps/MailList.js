import { MailPreview } from './MailPreview.jsx';
export function MailList({
  mails
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mail-list"
  }, mails.map(mail => /*#__PURE__*/React.createElement(MailPreview, {
    key: mail.id,
    mail: mail
  })));
}