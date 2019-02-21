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

## How to run as a service ?
1. Copy iminflow.service to /etc/systemd/system/
2. Edit WorkingDirectory in /etc/systemd/system/iminflow.service
3. Sudo systemctl start iminflow
4. Verify it's running: sudo systemctl status iminflow
5. If running as expected, add to startup: sudo systemctl enable iminflow.service

### Note
If you wanna control the daemon over the network, remember to bind to 0.0.0.0 or whatever interface you want the daemon to listen on(default is localhost)
Yes, yes it's written in javascript:b
If you can't connect to the daemon, check if "localhost" resolves to 127.0.0.1 - it might resolve to ::1 (IPv6 localhost)

## TODO:
- [ ] Support blink
- [ ] Support sound
- [ ] Create udev rule
- [X] Create systemd service file

