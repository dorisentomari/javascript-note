import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class User extends Component {
  render () {
    return (
      <>
        <h1>Hello, React</h1>
      </>
    )
  }
}

function click(e) {
  console.log(e);
}

function Mark (userInfo) {
  return (
    <>
      <div className="wrapper" id="mark-id" key={100} ref="mark-ref">
        <h1 className="title">Hello, Mark</h1>
        <ul className="list-wrapper">
          <li className="list" onClick={click}><span>Name: </span><span>{userInfo.name}</span></li>
          <li className="list"><span>Age: </span><span>{userInfo.age}</span></li>
          <li className="list"><span>Home: </span><span>{userInfo.home}</span></li>
        </ul>
      </div>
    </>
  );
}

let userInfo = {
  name: 'Mark',
  age: 18,
  home: 'Shanghai'
};

console.log(Mark(userInfo));

ReactDOM.render(<User/>, window.root);

let MarkElement = {
  "key": null,
  "ref": null,
  "props": {
    "children": {
      "type": "div",
      "key": "100",
      "ref": "mark-ref",
      "props": {
        "className": "wrapper",
        "id": "mark-id",
        "children": [{
          "type": "h1",
          "key": null,
          "ref": null,
          "props": {
            "className": "title",
            "children": "Hello, Mark"
          },
          "_owner": null,
          "_store": {}
        }, {
          "type": "ul",
          "key": null,
          "ref": null,
          "props": {
            "className": "list-wrapper",
            "children": [{
              "type": "li",
              "key": null,
              "ref": null,
              "props": {
                "className": "list",
                "children": [{
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": "Name: "
                  },
                  "_owner": null,
                  "_store": {}
                }, {
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": "Mark"
                  },
                  "_owner": null,
                  "_store": {}
                }]
              },
              "_owner": null,
              "_store": {}
            }, {
              "type": "li",
              "key": null,
              "ref": null,
              "props": {
                "className": "list",
                "children": [{
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": "Age: "
                  },
                  "_owner": null,
                  "_store": {}
                }, {
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": 18
                  },
                  "_owner": null,
                  "_store": {}
                }]
              },
              "_owner": null,
              "_store": {}
            }, {
              "type": "li",
              "key": null,
              "ref": null,
              "props": {
                "className": "list",
                "children": [{
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": "Home: "
                  },
                  "_owner": null,
                  "_store": {}
                }, {
                  "type": "span",
                  "key": null,
                  "ref": null,
                  "props": {
                    "children": "Shanghai"
                  },
                  "_owner": null,
                  "_store": {}
                }]
              },
              "_owner": null,
              "_store": {}
            }]
          },
          "_owner": null,
          "_store": {}
        }]
      },
      "_owner": null,
      "_store": {}
    }
  },
  "_owner": null,
  "_store": {}
}
