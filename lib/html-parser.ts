import * as htmlparser2 from 'htmlparser2'
import { Node, Element, Text, Comment } from "domhandler";
import {ICustomerNode} from 'interface'

export default class TemplateParser {
  private ast: Node[] | null
  constructor(text: string) {
    this.ast = null;
    this.parse(text)
  }

  parse(scriptText: string) {
    const ast = htmlparser2.parseDocument(scriptText)
    
    if(ast) {
      this.ast = ast.children
    }
  }

  /**
   * AST转文本方法
   * @param ast
   * @returns {string}
   */
  astToString(ast: Node[]) {
    ast = ast || this.ast;
    let str = "";
    if(!ast) return "";
    ast.forEach((item) => {
      if (item.type === "text") {
        str += (item as Text).data;
      } else if (item.type === "tag") {
        let node = item as Element
        str += "<" + node.name;
        if (node.attribs) {
          Object.keys(node.attribs).forEach((attr) => {
            const value = node.attribs[attr];
            if (value === "") {
              str += ` ${attr}`;
            } else {
              str += ` ${attr}="${node.attribs[attr]}"`;
            }
          });
        }
        if (["img", "input", "br"].includes(node.name)) {
          str += "/>";
        } else {
          str += ">";
        }
        if (node.children && node.children.length) {
          str += this.astToString(node.children);
        }
        if (!["img", "input", "meta", "br"].includes(node.name)) {
          str += `</${node.name}>`;
        }
      } else if (item.type === "comment") {
        let node = item as Comment
        str += `<!--${node.data}-->`;
      } else if (item.type === "directive") {
        str += "<!DOCTYPE html>";
      }
    });
    return str;
  }

  toElementObject() {
    if(!this.ast) return []
    const ast = this.ast.filter(item => item.type !== 'text')
    let nodes: ICustomerNode[] = ast.map(item => {
      const node = item as Element
      let d = ''
      if(node.children && node.children.length) {
        d = this.astToString(node.children)
      }
      return {
        type: node.type,
        name: node.name,
        data: d,
        attrs: node.attribs
      }
    })
    return nodes
  }
}
