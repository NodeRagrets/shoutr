describe('Database', function(){

  describe('insertion helper functions', function(){
    var helpers;
    // beforeEach(function(done){

    // })

    it('addUser adds a user to the database', function(done){
      helpers.addUser({
        username: 'testy',
        password: 'test',
        email: 'test@tom.com'
      });
      var prom = helpers.getUser('testy');
      prom.then(function(user){
        expect(user.get('username')).toBe('testy');
        expect(user.get('password')).toBe('test');
        expect(user.get('email')).toBe('test@tom.com');
      })
    })




  })

})