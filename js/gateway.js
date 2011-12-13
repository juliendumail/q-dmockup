var TargetGW = new Gateway;

function Gateway{
  // Private Property
  var IPAddress = 'localhost';

  return {
    // Public Property
    // ... here...
	
	// Public Methods
	//
    getIPAddress: function() {
      return this.IPAddress;
    },
    setIPAddress: function(new_IPAddress) {
      this.IPAddress = new_IPAddress;
    }
  };
}