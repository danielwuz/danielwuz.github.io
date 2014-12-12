---
layout: post
title: "Show progress while downloading in Elisp"
date: 2014-12-12 10:09:02 -0500
comments: true
categories:
---

Below is an example of showing a progress bar while downloading in Elisp.

![img](/images/20141212/show-downloading-progress.png "tab margin")

```lisp
(defun show-progress-demo ()
  (interactive)
  (let ((download-reporter
         (make-progress-reporter "Downloading python documentation..."
                                 0  100)))
    (url-retrieve "http://www.google.com"
                  (lambda (data bar)
                    ;; skip http header
                    (re-search-forward "\r?\n\r?\n")
                    (write-region (point) (point-max) "/tmp/google")
                    (progress-reporter-done bar)
                    ) `(,download-reporter))
    (dotimes (k 100)
      (sit-for 0.01)
      (progress-reporter-update download-reporter k))
    ))
```

`url-retrieve` is an Elisp function to asynchronously retrieve URL. `progress-reporter-update` is to continuously display how much percentage has completed in echo area.

First thing you need to pay attention is this line of code:
```
(re-search-forward "\r?\n\r?\n")
```
Because response content of the callback also contains the HTTP headers, you need to skip them before writing to disk.

Another key part of this demo is that `download-reporter` has to be passed in as an object to `url-retrieve` callback. This is because when an asynchronous program starts running in elisp, Emacs launches a separate process for it. Thus we have to pass it as callback argument in order to use it, otherwise, you'll receive an error message:
```
error in process filter: Symbol's value as variable is void: download-reporter
```

It's worth to know that `url-retrieve` also has a sibling `url-copy-file`, which download a file synchronously. If you don't need to show downloading progress, go with the latter, it's much easier to use.
