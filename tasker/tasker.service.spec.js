const Tasker = require('./tasker.service');
const tasker = new Tasker();

describe('Tasker: priceCalculate', function () {
    test('priceCalculate should return correct price', () => {
        expect(() => tasker.priceCalculate(0, 'uk',)).toThrow(`File factor map does not have this type`);
        expect(tasker.priceCalculate(-10, 'uk','docx' )).toEqual(50);
        expect(tasker.priceCalculate(0, 'uk','docx' )).toEqual(50);
        expect(tasker.priceCalculate(1000, 'uk', 'docx')).toEqual(50);
        expect(tasker.priceCalculate(1001, 'uk', 'docx')).toEqual(50.05);
        expect(tasker.priceCalculate(1001, 'ru', 'docx')).toEqual(50.05);
        expect(tasker.priceCalculate(1001, 'en', 'docx')).toEqual(120.12);
        expect(tasker.priceCalculate(1002, 'uk', 'docx')).toEqual(50.10);
        expect(tasker.priceCalculate(1003, 'uk', 'docx')).toEqual(50.16);
        expect(tasker.priceCalculate(999999, 'uk', 'docx')).toEqual(49999.95);
    });

    test('priceCalculate should return correct price with other mime type', () => {
        expect(() => tasker.priceCalculate(0, 'uk',)).toThrow(`File factor map does not have this type`);
        expect(tasker.priceCalculate(-10, 'uk','other' )).toEqual(50);
        expect(tasker.priceCalculate(0, 'uk','other' )).toEqual(50);
        expect(tasker.priceCalculate(1000, 'uk', 'other')).toEqual(60);
        expect(tasker.priceCalculate(1001, 'uk', 'other')).toEqual(60.06);
        expect(tasker.priceCalculate(1001, 'ru', 'other')).toEqual(60.06);
        expect(tasker.priceCalculate(1001, 'en', 'other')).toEqual(144.15);
        expect(tasker.priceCalculate(1002, 'uk', 'other')).toEqual(60.12);
        expect(tasker.priceCalculate(1003, 'uk', 'other')).toEqual(60.19);
        expect(tasker.priceCalculate(999999, 'uk', 'other')).toEqual(59999.94);
    });

    test('priceCalculate should throw error without mimeType or not found mime type', () => {
        expect(() => tasker.priceCalculate(0,'uk' ,null)).toThrow(`File factor map does not have this type`);
        expect(() => tasker.priceCalculate(0,'ru' ,'')).toThrow(`File factor map does not have this type`);
        expect(() => tasker.priceCalculate(0,'en' ,undefined)).toThrow(`File factor map does not have this type`);
        expect(() => tasker.priceCalculate(0,'en' ,'not found mime type')).toThrow(`File factor map does not have this type`);
    });

    test('priceCalculate should throw error without language or not found language', () => {
        expect(() => tasker.priceCalculate(0,null ,'docx')).toThrow(`This language doesn't support`);
        expect(() => tasker.priceCalculate(0,'' ,'docx')).toThrow(`This language doesn't support`);
        expect(() => tasker.priceCalculate(0,undefined ,'docx')).toThrow(`This language doesn't support`);
        expect(() => tasker.priceCalculate(0,'not found language' ,'docx')).toThrow(`This language doesn't support`);
    });
});

describe('Tasker: deadlineDateCalculate', () => {
    let startDate;
    let deadlineDate;

    describe('test friday', function () {

        test('test friday start earlier', () => {
                startDate = new Date(2021, 11, 10, 9, 30);

                deadlineDate = new Date(2021, 11, 10, 11, 0)
                expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 10, 11, 30)
                expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 10, 11, 34)
                expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 10, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
            }
        );

        test('test friday start later', () => {
                startDate = new Date(2021, 11, 10, 19, 0);

                deadlineDate = new Date(2021, 11, 13, 11, 0)
                expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 30)
                expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 34)
                expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 15, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
            }
        );

        test('test friday start work time', () => {
            startDate = new Date(2021, 11, 10, 10, 23);

            deadlineDate = new Date(2021, 11, 10, 11, 0)
            expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 10, 11, 30)
            expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 10, 11, 34)
            expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 10, 22)
            expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 10, 23)
            expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 10, 22)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 10, 23)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
        })
    });

    describe('test saturday', () => {
        test('test saturday start earlier', () => {
                startDate = new Date(2021, 11, 11, 9, 30);

                deadlineDate = new Date(2021, 11, 13, 11, 0)
                expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 30)
                expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 34)
                expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 15, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
            }
        );

        test('test saturday start later', () => {
                startDate = new Date(2021, 11, 10, 19, 0);

                deadlineDate = new Date(2021, 11, 13, 11, 0)
                expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 30)
                expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 11, 34)
                expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 13, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 14, 18, 59)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

                deadlineDate = new Date(2021, 11, 15, 10, 0)
                expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
            }
        );

        test('test saturday start 10 - 19', () => {
            startDate = new Date(2021, 11, 10, 11, 23);

            deadlineDate = new Date(2021, 11, 10, 11, 0)
            expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 10, 11, 30)
            expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 10, 11, 34)
            expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 22)
            expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 23)
            expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 11, 22)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 11, 23)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
        })
    })

    describe('test sunday', () => {
        test('test sunday start earlier', () => {
            startDate = new Date(2021, 11, 12, 9, 30);

            deadlineDate = new Date(2021, 11, 13, 11, 0)
            expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 30)
            expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 34)
            expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 15, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
        })

        test('test sunday start later', () => {
            startDate = new Date(2021, 11, 10, 19, 0);

            deadlineDate = new Date(2021, 11, 13, 11, 0)
            expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 30)
            expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 34)
            expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 15, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
        })

        test('test sunday start 10 - 19', () => {
            startDate = new Date(2021, 11, 12, 11, 23);

            deadlineDate = new Date(2021, 11, 13, 11, 0)
            expect(tasker.deadlineDateCalculate(startDate, 0)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 30)
            expect(tasker.deadlineDateCalculate(startDate, 60)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 11, 34)
            expect(tasker.deadlineDateCalculate(startDate, 64)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 13, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 509)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 14, 18, 59)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 539)).toEqual(deadlineDate);

            deadlineDate = new Date(2021, 11, 15, 10, 0)
            expect(tasker.deadlineDateCalculate(startDate, 510 + 540)).toEqual(deadlineDate);
        })
    })
});

describe('Tasker: useTaskToText', () => {
    let resultObj;
    let startDate = new Date(2021, 11, 13, 10, 0);
    test('should return correct result object', () => {
        resultObj = {price: 50, time: 1, deadline: 1639387800000, deadline_date: '13/12/2021 11:30:00'};
        expect(tasker.useTaskToText(1000, 'uk', 'docx', startDate)).toEqual(resultObj);
        expect(tasker.useTaskToText(1000, 'ru', 'docx', startDate)).toEqual(resultObj);

        resultObj = {price: 120, time: 3.01, deadline: 1639395060000, deadline_date: '13/12/2021 13:31:00'};
        expect(tasker.useTaskToText(1000, 'en', 'docx', startDate)).toEqual(resultObj);

        resultObj = {price: 1171.55, time: 17.35, deadline: 1639555500000, deadline_date: '15/12/2021 10:05:00'};
        expect(tasker.useTaskToText(23431, 'uk', 'docx', startDate)).toEqual(resultObj);
        expect(tasker.useTaskToText(23431, 'ru', 'docx', startDate)).toEqual(resultObj);

        resultObj = {price: 2811.72, time: 70.22, deadline: 1640188320000, deadline_date: '22/12/2021 17:52:00'};
        expect(tasker.useTaskToText(23431, 'en', 'docx', startDate)).toEqual(resultObj);
    })
    test('should throw language error', () => {
        resultObj = {price: 50, time: 1, deadline: 1639387800000, deadline_date: '13/12/2021 11:30:00'};
        expect(() => tasker.useTaskToText(1000, null ,'docx', startDate)).toThrow(`This language doesn't support`)
        expect(() => tasker.useTaskToText(1000, '' ,'docx', startDate)).toThrow(`This language doesn't support`)
        expect(() => tasker.useTaskToText(1000, undefined ,'docx', startDate)).toThrow(`This language doesn't support`)

    })
    test('should throw mime type error', () => {
        resultObj = {price: 50, time: 1, deadline: 1639387800000, deadline_date: '13/12/2021 11:30:00'};
        expect(() => tasker.useTaskToText(1000, 'uk' ,null, startDate)).toThrow(`File factor map does not have this type`)
        expect(() => tasker.useTaskToText(1000, 'ru' ,'', startDate)).toThrow(`File factor map does not have this type`)
        expect(() => tasker.useTaskToText(1000, 'en' ,undefined, startDate)).toThrow(`File factor map does not have this type`)

    })
})