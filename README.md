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


### Endpoints

[/api/earthquakes](http://localhost:3000/api/earthquakes)