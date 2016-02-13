## Pause auto-mark for deletion

This is a GreaseMonkey/TamperMonkey user script (briefly tested in Firefox) that simplifies deletion of old releases on pause.perl.org.

It attempts to do the following:

* All releases with version numbers containing `_` are checked (as long as it is not the latest release).
* All releases except the two newest are checked.
