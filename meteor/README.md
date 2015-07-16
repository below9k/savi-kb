```
#!

 ___ ____  _____________  __________                   ___              ___   
|   |    |/ _|\______   \ \______   \________  _____  |__| ____   _____/  |_
|   |      <   |    |  _/  |     ___/\_  __ / / _  \  |  |/ __ \_/ ___\   __|
|   |    |  \  |    |   \  |    |     |  |   ( <_> )  |  |  __ /\  \___|  |  
|___|____|___\ |________/  |____|     |__|   \____/\__|  |\____> \_____>__|  
                                                  \______|                   
```
--------------------------------
	Designed for Diem Digital - for internal company use
	Designed by: Chris Daniel - 2014
	Knowledge Base Project 2014
----------------------------------
 	**v0.9+ - BrownLetloose**
 	Remove ability for all to edit
 	Options:
 	 	Filter edit page to creator_id?
 	 	Filter edit page to only listed userId?
 	Revision tracking for auditing (**requires storing temp document before editing to maintain revisions**)
 	Options:
 	 	Store entire documents
 	 	Find differences in original vs new saved; store these.
-------------------------------
 	**v0.8.9+ - BrownDowntown**
 	???
------------------------------
 	**v0.8.8+ - CinchedBrowneye**
 	???
-------------------------------
 	**v0.8.7+ - Portapoot**
 	Redo links to preserve data reload.. wasting so much atm..
--------------------------------
 	**v0.8.6+ - TurdBucket**
 	Change ui for bottom toolbar
 	Options:
 	 	Change to single button with hover effect for multiple
 	 	Move to top with on click drop down menu
--------------------------------
 	**v0.8.5+**
 	Add commenting section — only logged in users can comment
 	Fix mobile editing — slightly buggy depending on device. (blocked editing on mobile entirely)
 	Added more delete article buttons
 	Ordering of articles within the group
 	Options:
 	 	Relative order + alphabetical — with no absolute numbering
 	Complete:
 	 	Using mongo sort first by 'parent.group_order' then by 'last_updated' (two articles with default 1 group get sorted by last update until a higher group_order is found)
-------------------------------
 	**v0.8.4+**
 	Edits made, page marked as unsaved. (start of revision system)
 	Must Do:
 	 	Edit save feature to update hidden fields OR allow for reactive database pulls.
 	 	Css/unsaved identifier (change from red bg)
 	Options:
 	 	Check database against changes
 	 	Store original unchangeable in hidden field for comparison
 	Completed:
 	 	Using hidden field to compare actively being edited article.
-----------------------------
 	v0.8.3 - Skipoo
 	(Interal change notes added - see http://ikb.l2share.net:8080/view/1bfdb684428ab843ab0652f7/ for details)
 	Changelog 1/21/2015
--------------------------
 	v0.8.1+2 - Pfffffft
 	Notifier working - broken since PHP version :D
 	v0.8.0 - PersonalShart
 	Added personal article feature
 	Fixed stuff.. ya, stuff
 -----------------------------------
 	v0.7.2 - PrintDangle
 	Print for chrome fixed (FierFux still broken - fts) -- css stuff
 	Removed stupid block wrapper around stuff that was causing infinite block propogation. BLOCKS
 	Minor css changes
 -----------------------------------
 	v0.7.1 - RaspberryDangle
 	Uplooods done. Copy works (doesn't suck so much)
 -----------------------------------
 	v0.7.0 - RaspberryDingle
 	Added new user group support (it sucks ass but that's a prob for future me)
 	Updated upload system (see above)
 	Account creation is open... for now...
 	Changelog 1/01/2015
 -----------------------------------
 	v0.6.5 - Fuqdatsheeit
 	Added group page
 	Change/Updated Landing page UI (Tooltips, icons, pretty!)
 	Changelog 12/17/2014
 -----------------------------------
 	v0.6.0 - Poo
 	Basic user controls integrated
 	Fixed some broken UI + Minor tweaks
 	Changelog 9/8/2014
 -----------------------------------
 	v0.5.0 - M Healthy Stool
 	Responsive stuffs updated - much purtyr
 	Baeta Lyve!
 	Changelog 9/4/2014
 -----------------------------------
 	v0.4.0 - S Healthy Stool
 	Added Group sorting
 	Fixed Search Stuff - Tags n empty returns n moved to top
 	Changelog 9/4/2014
 -----------------------------------
 	v0.3.1 - XS Healthy Stool
 	Lightbox! Panzoom! OMG
 	Changelog 8/27/2014
 -----------------------------------
 	v0.3.0 - Healthy Stool
 	Tons of bugs fixed, including reactive data dupes - fix: this.ready() when passing 'data' to template
 	TODO: Must do "Group View" page
 -----------------------------------
 	Changelog 8/20/2014
 	v0.2.0 - Aww Poopy
 	Looks like SAVI! LLOOOOOK AT TIIIT!
 	Functionly sound it seems (oh wait v0.3.0 nvm)
 	Added delete article feature
 	Service side user check for Meteor.call - must be logged in now, no console
 -----------------------------------
 	Changelog 8/2014
 	v0.1.0b - Awwshiit
 	It has begun - BasedGodBasedOn l2share.net/wf.php [php -> javascript]
