import serverless from "serverless-http";

import {app, router} from '../../app'

app.use('/', router);

export const handler = serverless(app);