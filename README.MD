# Boilerplate for RAD frontend

the application using refinejs, nextjs, storybook and tailwindcss

### Install dependency

    npm install

## Run app

    npm run dev

and go url: <http://localhost:3000/>

## Run story book

    npm run storybook

### Run storybook testing code coverage

    npm run test-storybook -- --coverage

### Generate report

    npx nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/storybook

and go url: <http://localhost:6006/>

## Quality Control

### Check

    npm run lint

### Fix automatically

    npm run lint -- --fix

### Duplicaiton

    jscpd --pattern "src/**/*.ts*"

### line of code

    sloc --details --format cli-table --keys total,source,comment src/app  >> app_loc.txt

## Deploy to Google Cloud Run

### Build docker image locally

    source .env.prod.sh
    docker build \
        --platform linux/amd64 \
        -t asia.gcr.io/bamboo-bi-356406/sbs_workhublink_ui:v0.8.0 \
        --build-arg SECRET_KEY_ARG=$SECRET_KEY \
        --build-arg API_ENDPOINT_ARG=$API_ENDPOINT \
        --build-arg NEXTAUTH_URL_ARG=$NEXTAUTH_URL \
        --network=host \
        --progress=plain .

### Push Docker image to Cloud image registry

    docker -- push  asia.gcr.io/bamboo-bi-356406/sbs_workhublink_ui:v0.8.0

### Update Cors policy for cloud bucket

    gcloud storage buckets update gs://workhub-link --cors-file=cors.config.json
