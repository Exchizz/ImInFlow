# Howto install

```
sudo apt install nodejs npm libudev-dev libusb-1.0-0-dev
```

Install dependencies
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

### Some extra
Put these lines into your ~/.bashrc or ~/.zshrc (depending on the shell you are using)
```
alias shallow='echo -n "green" | nc -w 1 -u localhost 1337'
alias deep='echo -n "red" | nc -w 1 -u localhost 1337'
```
source your *rc or open a new terminal to apply the aliases

```
source ~/.bashrc  (Again, depends on your shell)
```
Try running "shallow" and "deep"

### Over ssh
```
echo -n "red" | ssh user@device "nc -w 1 -u kiosk-01 1337"
```

### Note
If you wanna control the daemon over the network, remember to bind to 0.0.0.0 or whatever interface you want the daemon to listen on(default is localhost)
Yes, yes it's written in javascript:b
If you can't connect to the daemon, check if "localhost" resolves to 127.0.0.1 - it might resolve to ::1 (IPv6 localhost)

## TODO:
- [ ] Support blink
- [ ] Support sound
- [ ] Create udev rule
- [X] Create systemd service file
- [ ] Support request status
- [X] Example showing how to send commands to the deamon over ssh

