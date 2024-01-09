import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

import Routes from '../src/Routes';

export default (store, context, req) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );
  const html = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scheduler</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Prompt:wght@100;200;300;400;500;600;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles/styles.css">
</head>
<body>
   
    <div id="root">${content}</div>

    <script>
    window.INITIAL_STATE=${serialize(store.getState())}
        
    </script>
    <script src='/bundle.js'></script>

</body>
</html>

        `;
  return html;
};
