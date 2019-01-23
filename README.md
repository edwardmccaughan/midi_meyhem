connect a midi piano, run in chrome and it shoots fireworks when you press a piano key.

https://www.youtube.com/watch?v=rSy5GP3ihAg

* Needs to be run in a server, eg:  `python -m SimpleHTTPServer 8000`, or just run `python run_server.py`
* if you don't have a midi piano, `qwertyuiop` works too
* best played on a projector in a dark room
* it's a work in progress. feel free to clone and hack around on your own version
* uses the webmidi.js (https://github.com/cotejp/webmidi) and ShaderParticleEngine (https://github.com/squarefeet/ShaderParticleEngine)
* demo at http://midimeyhem.buzzwordoverload.co.uk
* note that this repo is mostly a convenient place to gather the built versions, most of the development is done in other repos (eg: https://github.com/edwardmccaughan/waaaves)

Disclaimer:
This was mostly hacked together at 3am by copying and pasting random crap together until something vaguely pretty appeared on the screen, if you enjoy reading well written, elegant, performant code....you might want to look away :-p
(I'm pretty sure if they guy that wrote the particle emitter library sees how I'm using it, he'd have a heart attack)
