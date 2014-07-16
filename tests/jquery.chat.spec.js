jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('test jquery plugin', function() {

    var el;

    beforeEach(function() {
        loadFixtures('chat.html');
        el = $('body');
        el.chat();
    });

    it('should show the login box', function() {
        expect('#user-wrapper').toBeVisible();
        expect('.error').toBeHidden();
    });

    it('should show an error message if now username is given', function() {
        $('#userForm').find('button').trigger('click');
        expect('.error').toBeVisible();
    });

    it('should close login box', function() {
        $('#name').val('tester');
        $('#userForm').find('button').trigger('click');
        expect('#user-wrapper').toBeHidden();
    });

    it('should open and close the color chooser', function() {
        expect('.colors').toBeHidden();
        $('#colorChooser span').click();
        expect('.colors').toBeVisible();
    });
});