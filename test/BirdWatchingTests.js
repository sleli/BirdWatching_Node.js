const assert = require('assert');

const GameField = require('../src/GameField');
const FieldSize = require('../src/FieldSize');
const Chicken = require('../src/Chicken');
const Duck = require('../src/Duck');
const Location = require('../src/Location');

describe('Bird Watching Tests', () => {
  let field;

  beforeEach(() => {
    field = new GameField(10, 5, 3, new FieldSize(10, 5, 3));
  });

  it('randomPlacingShouldStartGame', () => {
    field.addBird(new Chicken());
    field.addBird(new Duck());
    assert.ok(field.startGame('RANDOM'));
  });

  it('customPlacingShouldStartGameWithValidBirdsPlacing', () => {
    chicken = new Chicken();
    chicken.setLocation(new Location(0, 0));

    duck = new Duck();
    duck.setLocation(new Location(10, 5));
    duck.setHeight(3);

    field.addBird(chicken);
    field.addBird(duck);
    assert.ok(field.startGame('CUSTOM'));
  });

  it('customPlacingShouldNotStartGameWithInvalidBirdsPlacing', () => {
    chicken = new Chicken();
    chicken.setLocation(new Location(11, 0));

    duck = new Duck();
    duck.setLocation(new Location(10, 5));
    duck.setHeight(4);

    field.addBird(chicken);
    field.addBird(duck);
    assert.equal(field.startGame('CUSTOM'), false);
  });

  it('rightShotShouldFailIfGameIsNotStarted', () => {
    duck = new Duck();
    duck.setLocation(new Location(10, 5));
    duck.setHeight(3);

    field.addBird(duck);
    assert.equal(field.shot(10, 5, 3), false);
  });

  it('rightShotShouldHitABird', () => {
    duck = new Duck();
    duck.setLocation(new Location(10, 5));
    duck.setHeight(3);

    field.addBird(duck);
    field.startGame('CUSTOM');
    assert.ok(field.shot(10, 5, 3));
  });

  it('wrongShotShouldMissABird', () => {
    duck = new Duck();
    duck.setLocation(new Location(10, 5));
    duck.setHeight(3);

    field.addBird(duck);
    assert.equal(field.shot(9, 5, 3), false);
  });
});