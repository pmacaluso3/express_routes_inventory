# express_routes_inventory

I'm used to rails, where you have a command to inventory all the routes that your app has. It's very helpful for figuring out if you've build the routes you think you've built.

You can do something similar by inspecting the app object in express, specifically `app._router.stack`. Here are things I've found out:
1. Any top-level routes (created w/ `app.verb`) are easily inspectable within the `app._router.stack` array. These have a `.route.path` property.
2. If an instance of Router is mounted (ie `app.use('/some/route', someRouter)`, it has a `.handle.stack` property, and this property contains `someRouter`'s controller methods.
3. `someRouter` doesn't seem to have a property that neatly contains `/some/route`, it seems like we have to dig it out of a regex. Although maybe I'm doing it wrong.

Here are some todos:
1. Recur through nested subcontrollers
2. Improve getting the `some/route` string that corresponds to `someRouter`:
   2a. Is there a way to access this property w/o resorting to a regex?
   2b. If not, think about any edge case regexes that could appear in route strings
3. Wrap this in a node module
  3a. Ideally you could config this package to either display the routes in browser, or console.log them
  3b. Minimize dependencies: if displaying your routes in browser, res.send it so as to not depend on ejs

## Running this project
Clone down, `npm index.js`, and visit localhost:3000/routes

## Contributing
Cut a feature branch and make a PR!
