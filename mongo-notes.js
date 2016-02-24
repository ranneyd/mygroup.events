function(name, url, tags){ db.banners.insert({"name":name, "url":url, "tags": tags})}
function(name, newTag){db.banners.update({"name":name}, {$push: {"tags": {$each: [newTag]}}})}

banner("Laughing", "barlaugh.png", ["laughing", "bar", "night", "drinks"]);
banner("Basketball", "basketball.png", ["basketball", "sports", "live", "game"]);
banner("Board Game", "catan.png", ["board", "game", "geek", "catan", "nerd"]);
banner("Club", "club.png", ["club", "dancing", "party", "lights"]);
banner("Convention", "comiccon.png", ["convention", "expo", "comic", "con"]);
banner("Concert", "concert.png", ["concert", "live", "music"]);
banner("Dancing Lesson", "dancing.png", ["dancing", "lesson", "ballroom", "salsa"]);
banner("Dancing", "dancing2.png", ["dancing", "lesson", "ballroom", "salsa"]);
banner("Mixing", "dj.png", ["music", "dj", "mixing"]);
banner("Gardening", "gardening.png", ["outdoors", "outside" "dj", "mixing"]);
banner("Go Karts", "gokart.png", ["gokart", "gokarts", "go", "kart", "racing", "driving"]);
banner("Guitar", "guitar.png", ["music", "guitar", "lesson", "live", "concert"]);
banner("Gym", "gym.png", ["gym", "exercise"]);
banner("Volunteering", "habitat.png", ["building", "helping", "volunteering", "volunteer", "habitat", "community"]);
banner("Hiking", "hiking.png", ["hiking", "outside", "outdoors", "nature", "exercise"]);
banner("Together", "jump.png", ["jump", "together", "family", "group", "community"]);
banner("Makers", "makers.png", ["makers", "build", "nerd", "geek"]);
banner("Mall", "mall.png", ["shopping", "mall"]);
banner("Party", "party.png", ["party", "paint", "drinks", "live", "music"]);
banner("Pool", "pool.png", ["pool", "swim", "exercise", "outside", "outdoors", "exercise", "party"]);
banner("Restaurant", "restaurant.png", ["dinner", "food", "eating", "restaurant"]);
banner("Table Top", "rpg.png", ["rpg", "table", "gathering", "magic", "dungeons", "dragons", "role", "playing"]);
banner("Skiing", "skiing.png", ["snow", "skiing", "outside", "outdoors", "lifts"]);
banner("Soup Kitchen", "soupkitchen.png", ["volunteering", "soup", "kitchen", "help", "community"]);
banner("Sports", "sports.png", ["soccer", "sports", "outdoors", "outside", "exercise", "competition"]);
banner("Bowling", "bowling.png", ["bowling", "sports", "competition"]);
banner("Tennis", "tennis.png", ["tennis", "sports", "competition", "outside", "outdoors", "exercise"]);
banner("Theater", "theater.png", ["theater", "movies", "movie", "art"]);
banner("Movies", "movies.png", ["theater", "movies", "movie", "art", "obama"]);
banner("Forest", "trail.png", ["hiking", "nature", "outdoors", "outside", "exercise"]);
banner("Museum", "trex.png", ["natural", "history", "museum", "science"]);
banner("Video Games", "xbox.png", ["xbox", "video", "games"]);
banner("Yoga", "yoga.png", ["yoga", "lesson", "exercise"]);
banner("Zoo", "zoo.png", ["animals", "zoo", "outside", "outdoors"]);
banner("Lights", "lights.png", ["lights", "default"]);
banner("Art", "art.png", ["art", "lesson", "creative"]);
banner("Art Museum", "artmuseum.png", ["art", "museum"]);
banner("Bar", "bar.png", ["bar", "drinks", "party"]);
banner("Beach", "beach.png", ["beach", "ocean", "outside", "outdoors", "swim"]);

