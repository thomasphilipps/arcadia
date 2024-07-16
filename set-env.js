const fs = require('fs');
const targetPath = './client/src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  contactEmail: '${process.env.CONTACT_EMAIL}',
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Angular environment.prod.ts file generated correctly at ${targetPath}`);
  }
});
