---
layout: post
title: "Firefox Customization for Programmers"
date: 2014-07-26 10:03:53 -0400
comments: true
categories:
---
<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Introduction</a></li>
<li><a href="#sec-2">2. Maximize content area</a></li>
<li><a href="#sec-3">3. Maximize speed!</a></li>
<li><a href="#sec-4">4. Navigate faster</a></li>
<li><a href="#sec-5">5. Duckduckgo</a></li>
<li><a href="#sec-6">6. What's next</a></li>
<li><a href="#sec-7">7. External links</a></li>
</ul>
</div>
</div>

# Introduction

Firefox is famous for its highly customizability. You can almost tailor everything in Firefox to meet your taste. In this blog, I'll show you some customization that I did to increase my productivity as a  programmer. The browser version is 31.0 on MacOS as I'm writing this blog, but it should be similar on other platforms.

# Maximize content area

One of the thing that I would like to do is to remove tab margin. Tab margin is the blank space between a tab and your browser top boundary, as in below figure.

![img](/images/20140726/tab_margin.png  =250x "tab margin")

Since most of the time I keep my firefox full screen, I don't like tab margin because it's wasting space and I don't see any value of it, especially when I'm working on a small screen, every pixel counts! Let's get rid of it.

First off, let's find `userChrome.css`. `userChrome.css` is a CSS file in chrome folder that can be used to change the way that Firefox interface look. Basically, when you launch a Firefox application, it will load `userChrome.css` after loading its default settings; Therefore, you can customize almost every aspects of your browser UI by putting CSS in that file.

On Mac, you can find `userChrome.css` in directory *"~/Library/Application Support/Firefox/Profiles/xxxxxxxx.default/chrome/"*. Here, `xxxxxxxx` is a string of random characters. If you have trouble finding that location or you're on a different platform, see [Firefox Profile Folder](http://kb.mozillazine.org/Profile_folder_-_Firefox) for more detailed instruction.

Under the profile folder, open `userChrome.css` with your favarite text editor. If that file doesn't exist, simply create one in plain text. Then add below code.

``` css
    @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
    /* The above line should appear only once */

    #TabsToolbar {
      margin-top: -10px !important;
    }
```

And that's it! Relaunch your Firefox, you should see top margin is gone.

Another customization that you may do is to narrow the navigation bar margin a little bit. In my opinion, the default margin is too wide that makes the address bar look so small. Appending below code in your `userChrome.css` to make it thinner.

``` css
    #nav-bar-customization-target {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
```

See how Firefox looks in below screenshot{% fn_ref 1 %}. You can download the final `userChrome.css` file [here](/assets/20140726/userChrome.css).

![img](/images/20140726/fullscreen.png "no margin")

# Maximize speed!

If you're like me, who spend a significant time browsing web pages and looking for documentations everyday, you would like your browser to load a page as fast as possible. Here, I'll show you an easy way to make Firefox loading a page much much faster than other browsers. The idea is to by customizing HTTP Pipelining in Firefox. HTTP Pipelining is a technique in which multiple requests will be send out without waiting for the corresponding responses. It helps to speed up the browsing capability.

In address bar, type `about:config` and then click button "I'll be careful, I promise!". In the search box, type `pipe` and hit enter. You should see some configuration similar to below screenshot.

![img](/images/20140726/about_config.png "about:config")

Update below preferences:

<table class="table table-striped">
<thead>
<tr>
<th ><b>Preferences</b></th>
<th ><b>Value</b></th>
</tr>
</thead>

<tbody>
<tr>
<td >network.http.pipelining</td>
<td >true</td>
</tr>


<tr>
<td >network.http.pipelining.maxrequests</td>
<td >8</td>
</tr>


<tr>
<td >network.http.pipelining.ssl</td>
<td >true</td>
</tr>


<tr>
<td >network.http.proxy.pipelining</td>
<td >true</td>
</tr>
</tbody>
</table>


That's it. Restart your Firefox, and enjoy the speed.

# Navigate faster

As a programmer, Just imagine how amazing and effecient it would be to accomplish all your work only by keyboard.

Fortunately, there is a add-on called *VimFx* you can add to your Firefox. VimFx introduces Vim-style keyboard shortcuts for browsing and navigation, which can significantly reduce the time you spend moving your hand off the keyboard just to find the mouse. You can find this add-on and install instruction [here](<https://addons.mozilla.org/en-US/firefox/addon/vimfx/>). If you're a programmer and interested in this project, you may find their project page on [GitHub](<https://github.com/akhodakivskiy/VimFx>).

After installing VimFx to your Firefox, you may hit `?` on any page to see its keyboard cheatsheet. Here I'll show your some most useful shortcuts to get your on board. Since it's similar to vim, you can hit `j` to scroll page down, `k` to scroll page up, `h` to scroll left and `l` to scroll right; you can hit `o` to quickly focus on Address Bar, `O` to quickly focus on Search Bar; you can hit `d` to scroll half a page down, `u` to scroll half a page up, `gg`(means hit `g` twice) to go to the top of current page, `G` to go to the bottom; you can hit `J` to move to previous tab, `K` move to next one; you can hit `x` to close current tab, hit `X` to re-open last closed tab, which is my favoriate feature of this add-on.

One of the killer feature of VimFx is `f` - following a link on current page. It's so amazing that it I think it deserves a separate paragraph. `f` allows you quickly jump to any clickable element in a page by hitting a single key, similar to vim-easymotion or ace-jump in Emacs. Let's take a look in action. Go to `www.google.com`, and hit `f`. You'll see all clickable elements on the page will have a letter by its side.

![img](/images/20140726/vimfx.png "vimfx F key")

If you then hit any of those, Firefox will automatically click corresponding element, no matter an text box or a click. For example, hitting `s` in previous screenshot will focus on the search box.

If you are a vim user, you should find yourself at home; if you are not a vim user, play with it, and see how it can accelerate the way you browsing web pages.

# Duckduckgo

Last by not least, I suggest setting your default search engine in Firefox to *Duckduckgo*. [Duckduckgo](https://www.duckduckgo.com) is a search engine that emphasizes user privacy and avoid personalized user results. That means all users will see the same search results for a given search term. But what fascinates me is the power of search with bang `!`.

Bang `!` is a powerful tool for searching, and is unique in Duckduckgo. Typically, when a user wants to search something, she opens a new tab and go to her favorite search engine, `www.google.com` for instance, and types search terms, then hits `Enter`. Nothing wrong with this workflow, but we can do better. As a programmer, I often need to search on different sites, I may search a project on GitHub, or search a video on Youtube, or search a online course on Coursera. Duckduckgo can really help out in this situation by unifying the way you search.

Let's try it out. Firstly, let's set Duckduckgo as our default search engine. Go to `https://duckduckgo.com`, then click link "Use in Firefox" at the very bottom. Click "OK" in the pop up to accept, and we're good to go.

Now we can search any term directly in our search box or address bar{% footnote_ref 2 %}. Let's say I'd like to search emacs on GitHub. Type `emacs !gh` ("gh" stands for "Git Hub") in search box, then hit enter. Bang! A Github search result page will show in the browser with the keyword "emacs". How amazing! We don't even have to go to `https://github.com/` first. Similarly, if I want to search emacs on Youtube, I can simply type `emacs !yt` in my search box. Additionally, sometimes you might still want to search on Google or Bing, you can easily do so by appending `!g` or `!b` to your search terms, respectively. What's more, if you just include bang `!` with your search terms, Duckduckgo will redirect you to the first search result. This is handy for navigational search, e.g. try `facebook !`.

There are many such shortcuts with bang, I'll list some below that I use most frequently.

<table class="table table-striped">
<thead>
<tr>
<th >site</th>
<th >shortcut</th>
</tr>
</thead>

<tbody>
<tr>
<td >Google</td>
<td >!g</td>
</tr>


<tr>
<td >Bing</td>
<td >!b</td>
</tr>


<tr>
<td >GitHub</td>
<td >!gh</td>
</tr>


<tr>
<td >Youtube</td>
<td >!yt</td>
</tr>


<tr>
<td >Wikipedia</td>
<td >!w</td>
</tr>


<tr>
<td >Youdao Dictionary</td>
<td >!ydd</td>
</tr>
</tbody>
</table>

# What's next

There are many more tricks and add-ons a developer can use the increase productivity, for example, `Tile Tabs` allows you to align tabs side by side, and `FindBar Tweak` offers a really great in-browser text search experience. I may cover more add-ons like those in another blog.

Besides, you may wonder how do I know which attributes to put into `userChrome.css`. It turns out Firefox GUI is very similar to an HTML application and you can inspect its element and/or debug its GUI, with an add-on called `DOM Inspector`. I may cover this topic in future blog as well.

# Footnotes
{% footnotes %}
  {% fn %} Screenshot was taken in fullscreen, with theme Fearthox designed by IAL.
  {% fn %} I personally removed search box from toolbar, because I can use address bar for both searching and navigating. If I want to perform searching, I simply type search terms plus `!g` in address bar, as you see in this blog, thanks to the power of duckduckgo.
{% endfootnotes%}
