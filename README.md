# deprem-api
Son genel depremler


### Start Development

Started development mode.

    git clone https://github.com/yasaricli/depremler-api.git
    cd depremler-api
    meteor npm install
    export REDIS_URL=redis://127.0.0.1:32774
    export DEP_API_URL=http://koeri.boun.edu.tr/scripts/lst7.asp
    meteor


## One signal exports
One signal tarafındaki keylerin aşşağıdaki şekilde setlenmesi gerekiyor.

    export ONESIGNAL_USER_AUTH_KEY=XXX
    export ONESIGNAL_APP_AUTH_KEY=XXXXXXX
    export ONESIGNAL_APP_ID=XXXXXXX

### Endpoints

[/api/earthquakes](http://localhost:3000/api/earthquakes)
