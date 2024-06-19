// tests/1_unit-tests.js

'use strict';

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

    suite('convertHandler.getNum(input)', () => {

        test('Whole number input', (done) => {
            var input = '32mi'
            assert.equal(convertHandler.getNum(input), 32)
            done()
        })

        test('Decimal number input', (done) => {
            var input = '32.2mi'
            assert.equal(convertHandler.getNum(input), 32.2)
            done()
        })

        test('Fractional input', (done) => {
            var input = '32/2mi'
            assert.equal(convertHandler.getNum(input), 16)
            done()
        })

        test('Fractional input with decimal', (done) => {
            var input = '32.0/2mi'
            assert.equal(convertHandler.getNum(input), 16)
            done()
        })

        test('Double fraction input', (done) => {
            var input = '3/2/3km'
            assert.equal(convertHandler.getNum(input), 'invalid number')
            done()
        })

        test('No num provided. Default to 1', (done) => {
            var input = 'km'
            assert.equal(convertHandler.getNum(input), 1)
            done()
        })
    })

    suite('convertHandler.getUnit(input)', () => {

        test('For each valid input unit', (done) => {
            let units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
            units.forEach(elem => {
                assert.equal(convertHandler.getUnit('10' + elem), elem.toLowerCase() === 'l' ? 'L' : elem.toLowerCase())
            });
            done()
        })

        test('Invalid input unit', (done) => {
            assert.equal(convertHandler.getUnit('10pound'), 'invalid unit')
            done()
        })
    })

    suite('convertHandler.getReturnUnit(initUnit)', () => {

        test('Return correct valid return unit', (done) => {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
            let checkUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']
            
            inputUnits.forEach((elem, i) => {
                assert.equal(convertHandler.getReturnUnit(elem), checkUnits[i])
            });
            done()
        })
    })

    suite('convertHandler.spellOutUnit(unit)', () => {

        test('Return spelled-out string unit for every valid unit', (done) => {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
            let checkUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
            
            inputUnits.forEach((elem, i) => {
                assert.equal(convertHandler.spellOutUnit(elem), checkUnits[i])
            });
            done()
        })
    })

    suite('convertHandler.convert(initNum, initUnit)', () => {

        test('Convert gal to L', (done) => {
            assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1)
            done()
        })

        test('Convert L to gal', (done) => {
            assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1)
            done()
        })

        test('Convert mi to km', (done) => {
            assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1)
            done()
        })

        test('Convert km to mi', (done) => {
            assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1)
            done()
        })

        test('Convert lbs to kg', (done) => {
            assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1)
            done()
        })

        test('Convert kg to lbs', (done) => {
            assert.approximately(convertHandler.convert(5, 'kg'), 11.0231, 0.1)
            done()
        })
    })
});
