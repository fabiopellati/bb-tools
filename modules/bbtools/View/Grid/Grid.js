'use strict';
var Grid = {};

Grid.TableView = require('./TableView');

Grid.HeadView = require('./HeadView');
Grid.HeadRowView = require('./HeadRowView');
Grid.HeadCellView = require('./HeadCellStringView');

Grid.BodyView = require('./BodyView');
Grid.BodyRowView = require('./BodyRowView');
// Grid.BodyCellView = require('./BodyCellStringView');
Grid.BodyCellStringView = require('./BodyCellStringView');
Grid.BodyCellCheckboxView = require('./BodyCellCheckboxView');

module.exports = Grid;
