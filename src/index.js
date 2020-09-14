import _ from 'lodash';

function component () {
    var element = document.createElement('div');

    /* lodash is used here for bundling demonstration purposes */
    element.innerHTML = _.join(['Build', 'together;', 'not', 'alone'], ' ');

    return element;
}

document.body.appendChild(component());