# 📖 Ambrosia SchoolTastic! 📖
for the students by the students  

Ambrosia SchoolTastic is for schools which do online exams or tests or assesments,
features a Beautifully crafted UI and safety for the administrators, and teachers.
Can Be Hosted Locally!

In the future im thinking of making a Active Directory system for school managed computers,
automatically lock, and unlock during exams!

Safety is our priority!
Updates Monthly! Submit bugs and security vuln's at issues
for LICENSEING please read LICENSE
Code is modifyable

Can work on local infrastructure to limit internet access during examinations!

# 📸 Screen Shots

![](./Github/Land.png)
![](./Github/Login.png)
![](./Github/Dash.png)

# 👌 Features
* Examination Links
* Google Form Alternative
* Auto checker
* Self Deployable
* Scaling
* Secure
* Cloud Storage (Admins)
* Managed Hosting
* Customizability
* Built in plagiarism checker

# ☁️ Install

## 🤖 Normal
```bash 
 git clone https://github.com/AmbrosiaGG/SchoolTastic
 mv .env.template .env
 echo "Write info to .ENV"
 sleep 2
 nano .env
 echo "Install Bun"
 curl -fsSl https://bun.sh/install | bash > /dev/null

 # Run bash
 bash
 bun i

 # Test Bun
 bun .
 # Run SchoolTastic
 pm2 start --interpreter ~/.bun/bin/bun index.js --name "SchoolTastic" -- -color
```

## 🐋 Docker
```bash 
 export sessionsecretambrosia=uuidgen | tr -d '-'
 docker run -d duckeydevv/ambrosia-schooltastic \
 --env atlas= \
 --env session=$(sessionsecretambrosia) \
 --env port=3000 \
 --env updates=false \
 --env title=< Your School > \
 --name AmbrosiaSchoolTastic
```

We also do provided cloud hosting powered
by Dan Bot Hosting

# Schools Powered By SchoolTastic
* None :(

# 💻 For contributers 
## Conventional Commit Types
* feat(new feature)
* fix(bug fix)
* refractor(refactoring code)
* docs(changes to docs)
* style(formatting, missing commas, etc)
* test(adding missing tests or refactoring tests)
* chore(updating build tasks, etc)

## Pull Requests
* State changes
* Use the Conventional Commit Types

## Design
* Modern 
* Simplicity

## Design Tools
* [Tailwind](https://tailwindcss.com) | Use Tailwind! bun dev:css

* [Preline](https://preline.co) | For Functionality

* [Catppuccin](https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md) | Our Color scheme
