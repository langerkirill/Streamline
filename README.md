# Read Me

## Streamline is an application inspired by Strava that allows users to create and save their workouts, and possible routes to run or ride on a map. It integrates with the Google Maps Api to generate and save custom routes, as well is display the elevation along the route in a histogram.

### **Some highlights of the project:**

**Route saving and rendering logic:**

#### Adding a table to allow for saving and displaying routes:

Streamline was originally designed with only a few database tables in mind. I planned on having a users, routes, and workouts table. I ended up having to add another table after realizing the complexity of saving routes would necessitate adding a table for markers alone. If I did not add this, I would have had to include several extra elements to the routes table that would not fully represent routes. 

Markers are a google maps object, but in my project they represent latitudinal and longitudinal coordinates that need to be stacked together to generate a route.

With this extra table, I was able to iterate through every lat and lng coordinate in a specific Markers table item, to fully recreate the route on every route show page. 

#### Elevation Display:

#### Elevation Chart:

I used the google elevation API to render an elevation chart that generates an accurate representation of elevation gain. It creates 256 points between each marker and samples them for elevation. Then, I used google charts to draw a new histogram that displays all of the points that were sampled. I used JQuery to trigger a rerender of this histogram on page width manipulation, to ensure that the chart fits the window of the current user. 

#### Elevation Gain: 

After this elevation array is generated, I iterated through every elevation and added to a variable whenever a previous point was lower than the current point. This allowed for the elevation gain calculation. 

**Saving Workouts and Training Log:**

#### The training log:

Once the user adds a manual workout using the workout create page, the workout ends up saved in the workouts database. If the user navigates to either the front page or the training log pages, the workout is displayed based on the specific week when the workout was completed. I had to integrate javascript Date methods to create the display that shows all weeks in the past year backwards from the current date. In addition, I use React to render a new component for each week, that only has information about a workout (in the component’s props) if the workout falls within the days of the week that represent the start and end of the week in the specific training log item that is being rendered. 

Check out the [link to the wiki](https://github.com/langerkirill/Streamline/wiki) for more design details
