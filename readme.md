plan:
=nodejs and angularjs as frameworks
=parameterize loading pictures: picture filenames include date, organized in folders by date, sorted and displayed chronologically
deploy website on amazon aws
add labels to pictures for deep learning

find older pics (possibly video screen shots)

To Run:
(1)
mongod
(2)
cd PictureDocServer
node app.js
(3)
cd PictureDocApp
npm install
npm start

To Init:
Install angular modules and node modules by npm
Run PictureDocServer/db_init.js
Or
Run commands in mongo_scripts


-----
More installations:
nvm deactivate
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 10.15.1
node -e "console.log('Running Node.js ' + process.version)"

npm install -g @angular/cli

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/


-----
On AWS:

New login (change address every time instance launched):

https://aws.amazon.com/premiumsupport/knowledge-center/connect-http-https-ec2/
Make sure custom TCP port inbound rule 
Make sure enough memory

ssh -i "/Users/haoran/Dropbox/personal_projects/cloud-computing/aws/haoran_macbook-aws.pem" ubuntu@ec2-3-16-215-24.us-east-2.compute.amazonaws.com

. ~/.nvm/nvm.sh
sudo service mongod start

(3)
ng serve --proxy-config proxy.json --host 3.16.215.24 --port 4200

webpage at
3.16.215.24:8081

testing:
telnet 3.16.215.24 8081
curl http://3.16.215.24:8081

mv -v temp/* 1988-1991/
mv -v 1992-1999/* temp/
mv -v 2000-2001/* temp/
mv -v 2002-2013/* temp/
mv -v 2014-/* temp/
