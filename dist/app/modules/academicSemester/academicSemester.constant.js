"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterFilterableFields = exports.academicSemesterSearchableFields = exports.academicSemesterTitleCodeMapper = exports.academicSemesterMonths = exports.academicSemesterCodes = exports.academicSemesterTitles = void 0;
exports.academicSemesterTitles = [
    'Autumn',
    'Summer',
    'Fall',
];
exports.academicSemesterCodes = [
    '01',
    '02',
    '03',
];
exports.academicSemesterMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
// mapping season with code
exports.academicSemesterTitleCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
// academic semester searchable field
exports.academicSemesterSearchableFields = ['title', 'code', 'year'];
// filterable field
exports.academicSemesterFilterableFields = [
    'searchTerm',
    'title',
    'code',
    'year',
];
