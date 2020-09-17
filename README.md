This is the codebase for the [NatCap viz gallery](http://viz.naturalcapitalproject.org/)<br/>
*Interested in contributing? [Send an email](mailto:chweil@stanford.edu) and tell us about your idea*

Besides the css, images, and js folders - which contains code for the gallery - this repo includes several subfolders with builds for other NatCap visualization. 

## Structure

### Viewers hosted here
When viewer is final, add a folder `name_of_viewer` with all its contents, directly in the root of this repo. The viewer will be directly accessible at `viz.naturalcapitalproject.stanford.edu/name_of_viewer`

### `Index.html` 
This file includes all html code, and is probably the only thing you'll need to change. It is divided into three sections. First, the side menu is declared, then the header, and finally the main content with all the examples and resources. 


### Other folders
* `/js` - includes javascript for interaction
* `/images` - includes all thumbnails and images for the projects featured
* `/css` - includes css code


## Adding a new visualization
In `index.html`, locate where you'd like to add it. Each example is manually added, in rows of 3.
1. If there's room in the row, simply include a new div with the project: <br/>
    Change the link, the image, the name, info, it'll look like this:
```
      <div class="w3-third w3-container w3-margin-bottom filterDiv webmaps">
        <a href='link to the viewer' target='_blank'> 
           <img src="images/name of image" alt="Image" style="width:100%" class="w3-hover-opacity">
        </a>
        <div class="w3-container w3-white">
          <p><b>Name of viewer</b></p>
          <p>Short intro text
            <span class="light"> By the creator</span>
          </p>
        </div>
     </div>
 ```
 <br/>
2. If the row is full, create a new row by adding the following code: - then include a new div as above <br/>
    
 ```
   <!-- New example row -->
   <div class="w3-row-padding">
   <!-- Three new examples can be placed here -->
   </div>
 ```

## Git cheatsheet
If you're working on a local (cloned) version of this repo, here are all the commands you'll need. Run them from command line, once you navigated to the directory (folder) where you cloned viz.Stanford.

* `git pull` : before you start updating the website, "pull" (=grab from the online repo) the latest version, in case someone else made changes in the meantime
* `python -m http.server` : run this to launch a local server, to see your changes in action before pushing them online. If it doesn't open automaticallly you'll need to go to localhost:8000 in a browser, once you've run this command. (It could - unlikely - be another port than 8000, it will output which port it uses in the command prompt).
* `git status`: once you made changes, this command will print which files you updated. 
* `git add *`: if you added new files (e.g an image in images/ to illustrate a new viewer in the gallery...), you need to add it. Replace * by the fille you want to add, or just use * to add everything.
* `git commit -am "Commit message"` : "Commit" (=Save) your changes. Put a descriptive commit message in the ".
* `git push` : "push" (=send your changes to the online repo). Aand that's it! The deployment is automated through github-pages, so in a few minutes you'll see your changes on the website.

 
