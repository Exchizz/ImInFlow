# Howto install

```
sudo apt install nodejs npm
```

Install node dependencies
```
cd project-dir && npm install
```

## Usage
1. Create udev rule (or run the deamon as root...)
2. Run the deamon:
```
sudo nodejs index.js
```
4. Send a udp packet consisting of whatever color you want the busylight to show..
ex.
```
echo -n "red" | nc -w 1 -u localhost 1337
```

### Note
If you wanna control the daemon over the network, remember to bind to 0.0.0.0 or whatever interface you want the daemon to listen on(default is localhost)
Yes, yes it's written in javascript:b

## TODO:
- [ ] Support blink
- [ ] Support sound
- [ ] Create udev rule
- [ ] Create systemd service file

