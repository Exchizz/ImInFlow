# Howto install

```
sudo apt install nodejs
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


## TODO:
- [ ] Support blink
- [ ] Support sound
- [ ] Create udev rule
- [ ] Create systemd service file

