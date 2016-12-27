# TravelApp

git commit format: 

- 'FEATURE'-'FE/BE/DB': 'IMPERITIVE TENSE ACTION' -'INITIALS'

git PR comment format:

'NAME OF FEATURE WORKED ON'
- 'what was changed'

TO START APP:
- configure environment variables to appropriate values in a file named '.env'
  - compare the structure of this file to '.env.example'
- Set up username root with password = '' (password is an empty string) in mysql (to reset your root pwd: http://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html)
- run 'mysql.server stop'
- run 'mysql.server start'
- run 'mysql -u root -p'
- enter password '' (password is an empty string)
- run 'create database rurallion'
- it is recommended but not necessary  to use MySql WorkBench to visualize the different tables and confirm that caching was successful
- Open database/seed.js

- if in dev
  - run 'npm run dev' to start nodemon



REQUESTS:
'/api/relatedRecAreas' = [obj{
    img:String, 
    description:string, 
    address: string, 
    phoneNumber: string, 
    activities: [string,string],
    website: String,
    name: string
    coordinates: [num, num]
}]