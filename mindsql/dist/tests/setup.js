"use strict";
beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
});
afterEach(() => {
    jest.clearAllMocks();
});
