const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet">
  </head>
    <body>
      <div class="container" style="text-align: center; width: 60%; margin: 0 auto; background-color:#e9ecef; font-family: 'Slabo 27px', serif;margin-top: 1rem;">
        <div class="header" style="text-align: center; font-weight:bold; font-size:1.5rem;margin-top: 1rem;">I'd like your input!</div>
        <div class="sub-header" style="text-align: center; margin-top: 1rem;">Please answer the following question:</div>
        <div class="body" style="text-align: center; color: #0068ac; word-wrap: break-word;margin-top: 1rem;">${survey.body}</div>
        <div style="text-align: center; margin-top: 1rem;">
          <a class="btn" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes" style="display: inline-block; text-align: center; background-color: #28a745;border-color: #28a745; font-weight:400; white-space: nowrap; vrtical-align:middle; border: 1px solid transparent; color: #fff; text-decoration: none; border-radius: 0.3rem; line-height: 1.5; font-size: 1.5rem; padding: 0.75rem 1.5rem; ">Yes</a>
          <a class="btn" href="${keys.redirectDomain}/api/surveys/${survey.id}/no" style="display: inline-block; text-align: center; background-color: #28a745;border-color: #28a745; font-weight:400; white-space: nowrap; vrtical-align:middle; border: 1px solid transparent; color: #fff; text-decoration: none; border-radius: 0.3rem; line-height: 1.5; font-size: 1.5rem; padding: 0.75rem 1.5rem;">No</a>
        </div>
      </div>
    </body>
  </html>

  `;
};
