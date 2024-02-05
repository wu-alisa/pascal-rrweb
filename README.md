# pascal-rrweb

This is Pascal, a hotjar clone built on top of the rrweb library. It's a simple Node.js application using Express to serve static files from the root directory. It's configured to listen on port 5000 and can be used as a starting point for more complex server setups.

## Prerequisites

Before running this application, you'll need to have Node.js installed. Visit [Node.js download page](https://nodejs.org/en/download/) to download and install it if you haven't already.

## Installation

Clone the repository or download the files to your local machine. Assuming you have Node.js and npm (Node Package Manager) already installed, set up the project by running the following commands in the terminal:

```sh
Running the Server
To start the server, navigate to your project directory in terminal and run:
node index.js
Upon successful start, you should see the console output:
Server listening on port 5000
Accessing the Application
With the server running, open your web browser and visit http://localhost:5000/hello.html. Here you'll see a rendered session recording of sample events data from test.js, underneath which you'll find an array of events, highlighted in yellow as each event is displayed.
```

## Events Data Definition (WIP)

event type 2: the DOM tree of html elements
event type 3: events to do with user web behavior
event type 4: when the page renders, gives info about url, screensize, and when it loaded

node type 0: the base of website?
node type 1: something with publicId: "", systemId: ""
node type 2: html element. Includes a tagName such as 'html', 'head', 'body', 'div', 'a'
node type 3: something displayed on the website but not wrapped in an html element. e.g plain text

data source 0: adds/removal in the DOM tree, changing route?
data source 1: mouse movements, the id associated is the id of the element the cursor was on
data source 2: potentially to do with element status? 3 events with data source 2, and type 1 -> 0 -> 2 MEANS A CLICK.
data source 3: page scroll
data source 5: text?
data source 8: adds rules

data type: could be to do with element status (onclick, onfocus, etc)
