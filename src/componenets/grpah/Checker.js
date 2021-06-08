import React from "react";
const Checker = (props) => {
    function Nst(a, e, f) {
      this.a = a;
      this.e = e;
      this.f = f;
    }
  
    let nfa = [];
    let nfa_size = 0;
    let st = [];
    function insert_concat(regexp) {
      let ret = "";
      let c, c2;
      for (let i = 0; i < regexp.length; i++) {
        c = regexp[i];
        if (i + 1 < regexp.length) {
          c2 = regexp[i + 1];
          ret += c;
          if (c !== "(" && c2 !== ")" && c !== "+" && c2 !== "+" && c2 !== "*") {
            ret += ".";
          }
        }
      }
      ret += regexp[regexp.length - 1];
      return ret;
    }
    console.log(insert_concat("110*+11"));
    /*----------------------------------------------------------------------------------------------*/
  
    function priority(c) {
      switch (c) {
        case "*":
          return 3;
        case ".":
          return 2;
        case "+":
          return 1;
        default:
          return 0;
      }
    }
    function regexp_to_postfix(regexp) {
      let postfix = "";
      var op = [];
      let c;
      for (let i = 0; i < regexp.length; i++) {
        switch (regexp[i]) {
          case "0":
          case "1":
            postfix += regexp[i];
            break;
          case "(":
            op.push(regexp[i]);
            break;
          case ")":
            while (op[op.length - 1] !== "(") {
              postfix += op[op.length - 1];
              op.pop();
            }
            op.pop();
            break;
          default:
            while (op.length !== 0) {
              c = op[op.length - 1];
              if (priority(c) >= priority(regexp[i])) {
                postfix += op[op.length - 1];
                op.pop();
              } else break;
            }
            op.push(regexp[i]);
        }
        //cout<<regexp[i]<<' '<<postfix<<endl;
      }
      while (op.length !== 0) {
        postfix += op[op.length - 1];
        op.pop();
      }
      return postfix;
    }
    console.log(regexp_to_postfix(insert_concat("110*+11")));
    /*---------------------------------------------------------------*/
    function character(i) {
      let init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
      init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
  
      nfa[nfa_size].a[i].push(nfa_size + 1);
      st.push(nfa_size);
      nfa_size++;
      st.push(nfa_size);
      nfa_size++;
    }
    function union_() {
      let init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
      init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
      let d = st[st.length - 1];
      st.pop();
      let c = st[st.length - 1];
      st.pop();
      let b = st[st.length - 1];
      st.pop();
      let a = st[st.length - 1];
      st.pop();
      nfa[nfa_size].e.push(a);
      nfa[nfa_size].e.push(c);
      nfa[b].e.push(nfa_size + 1);
      nfa[d].e.push(nfa_size + 1);
      st.push(nfa_size);
      nfa_size++;
      st.push(nfa_size);
      nfa_size++;
    }
    function concatenation() {
      let d = st[st.length - 1];
      st.pop();
      let c = st[st.length - 1];
      st.pop();
      let b = st[st.length - 1];
      st.pop();
      let a = st[st.length - 1];
      st.pop();
      nfa[b].e.push(c);
      st.push(a);
      st.push(d);
    }
  
    function kleene_star() {
      let init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
      init_nfa_state = new Nst(
        {
          0: [],
          1: []
        },
        [],
        0
      );
      nfa.push(init_nfa_state);
      let b = st[st.length - 1];
      st.pop();
      let a = st[st.length - 1];
      st.pop();
      nfa[nfa_size].e.push(a);
      nfa[nfa_size].e.push(nfa_size + 1);
      nfa[b].e.push(a);
      nfa[b].e.push(nfa_size + 1);
      st.push(nfa_size);
      nfa_size++;
      st.push(nfa_size);
      nfa_size++;
    }
    function postfix_to_nfa(postfix) {
      for (let i = 0; i < postfix.length; i++) {
        switch (postfix[i]) {
          case "0":
          case "1":
            character(postfix[i] - "0");
            break;
          case "*":
            kleene_star();
            break;
          case ".":
            concatenation();
            break;
          case "+":
            union_();
            break;
          default:
        }
      }
    }
postfix_to_nfa(regexp_to_postfix(insert_concat(props.regex)));

let final_state=st[st.length-1]; st.pop();
let start_state=st[st.length-1]; st.pop();
nfa[final_state].f=1;
    function Dst(a, f) {
      this.a = a;
      this.f = f;
    }
    let dfa = [];
  
    function epsilon_closure(state, si) {
      for (let i = 0; i < nfa[state].e.length; i++) {
        if (si.has(nfa[state].e[i]) === false) {
          si.add(nfa[state].e[i]);
          epsilon_closure(nfa[state].e[i], si);
        }
      }
    }
  
    function state_change(c, si) {
      const temp = new Set();
      // console.log(si);
      if (c === 1) {
        for (let item of si) {
          for (let j = 0; j < nfa[item].a[0].length; j++) {
            temp.add(nfa[item].a[0][j]);
          }
        }
      } else {
        for (let item of si) {
          for (let j = 0; j < nfa[item].a[1].length; j++) {
            temp.add(nfa[item].a[1][j]);
          }
        }
      }
      return temp;
    }
  
    let isSetsEqual = (a, b) =>
      a.size === b.size && [...a].every((value) => b.has(value));
    function checkSameObjKey(map, key) {
      for (let mapkey of map.keys()) {
        if (isSetsEqual(mapkey, key)) {
          return true;
        }
      }
  
      return false;
    }
    function get(map, key) {
      for (let [mapkey, value] of map.entries()) {
        if (isSetsEqual(mapkey, key)) {
          return value;
        }
      }
    }
    function nfa_to_dfa(si, que, start_state) {
      let mp = new Map();
      let temp = new Set(JSON.parse(JSON.stringify([...si])));
      mp.set(temp, -1);
      let temp1 = new Set();
      let temp2 = new Set();
      let ct = 0;
      si.clear();
      si.add(0);
      // console.log(si);
      epsilon_closure(start_state, si);
      // console.log(si);
      // console.log(temp);
      if (checkSameObjKey(mp, si) === false) {
        // console.log("raj");
        mp.set(si, ct++);
        que.push(si);
      }
      // console.log(mp);
      let p = 0;
      let f1 = false;
  
      // console.log(que.size());
      let flag = 8;
      while (que.length !== 0) {
        let init_dfa_state = new Dst([-1, -1], false);
        dfa.push(init_dfa_state);
        // si.empty();
  
        si = new Set(JSON.parse(JSON.stringify([...que[0]])));
        f1 = false;
        for (let item of si) {
          if (nfa[item].f === 1) f1 = true;
        }
        dfa[p].f = f1;
        // console.log(state_change(1,si));
        temp1 = new Set(JSON.parse(JSON.stringify([...state_change(1, si)])));
        // console.log(temp1);
        si = new Set(JSON.parse(JSON.stringify([...temp1])));
        // console.log(si);
        for (let item of si) {
          epsilon_closure(item, si);
        }
        // if(mp.has(si)==false&&si.size!==0)
        if (checkSameObjKey(mp, si) === false) {
          // mp[si]=ct++;
          mp.set(si, ct++);
          que.push(si);
          dfa[p].a[0] = ct - 1;
        } else {
          let stat = get(mp, si);
          // console.log("rajuvava");
          // console.log(stat);
          dfa[p].a[0] = stat;
        }
        temp1.clear();
  
        si = new Set(JSON.parse(JSON.stringify([...que[0]])));
        temp2 = new Set(JSON.parse(JSON.stringify([...state_change(2, si)])));
        si = new Set(JSON.parse(JSON.stringify([...temp2])));
        for (let item of si) {
          epsilon_closure(item, si);
        }
        if (checkSameObjKey(mp, si) === false) {
          // mp[si]=ct++;
          mp.set(si, ct++);
          que.push(si);
          dfa[p].a[1] = ct - 1;
        } else {
          let stat = get(mp, si);
          dfa[p].a[1] = stat;
        }
        temp2.clear();
        que.shift();
  
        flag--;
        p++;
      }
      for (let i = 0; i < p; i++) {
        if (dfa[i].a[0] === -1) dfa[i].a[0] = p;
        if (dfa[i].a[1] === -1) dfa[i].a[1] = p;
      }
      let init_dfa_state = new Dst([-1, -1], false);
      dfa.push(init_dfa_state);
      dfa[p].a[0] = p;
      dfa[p].a[1] = p;
    }
    /*minimization of dfa-------------------------------------------------------------*/
    let si=new Set();
    let que=[];
    nfa_to_dfa(si,que,start_state);
    console.log(dfa);
    function minimize_dfa(dfa) {
      //cout<<dfa.size()<<endl;
      let grp = [...Array(dfa.length)]; /// Group number for states
      // vector<vector<int> > part(2, vector<int>());   /// Partition for groups
      let part = [[], []];
  
      /// Initializing the groups
      part[0].push(0);
      for (let i = 1; i < grp.length; i++) {
        if (dfa[i].f === dfa[0].f) {
          grp[i] = 0;
          part[0].push(i);
        } else {
          grp[i] = 1;
          part[1].push(i);
        }
      }
  
      // if(!part[1].legth) part.erase(part.end());
  
      /// Loop until no new partition is created
      let chk = true; /// Check if any new partition is created
      let strt = 0; /// Starting State
      while (chk) {
        chk = false;
  
        /*for(int i=0; i<part.size(); i++) {
                cout<<i<<":";
                for(int j=0; j<part[i].size(); j++) {
                    cout<<part[i][j]<<" ";
                } cout<<endl;
            } cout<<endl;*/
        /// Iterate over partitions and alphabets
  
        for (let i = 0; i < part.length; i++) {
          for (let j = 0; j < 2; j++) {
            // vector<pair<int,int> > trans(part[i].size());   /// Transitions for the states of partitions
            let trans = [...Array(part[i].length)];
            /// Iterate over states of partitions and find transition groups
  
            for (let k = 0; k < part[i].length; k++) {
              if (dfa[part[i][k]].a[j] >= 0)
                trans[k] = [grp[dfa[part[i][k]].a[j]], part[i][k]];
              else trans[k] = [-1, part[i][k]];
            }
  
            trans.sort(function (a, b) {
              return a[0] - b[0];
            });
  
            /// Break partition in case of different transitions
            if (trans[0][0] !== trans[trans.length - 1][0]) {
              chk = true;
  
              let k;
              let m = part.length - 1;
  
              part[i].splice(0, part[i].length);
  
              part[i].push(trans[0][1]);
              for (
                k = 1;
                k < trans.length && trans[k][0] === trans[k - 1][0];
                k++
              ) {
                part[i].push(trans[k][1]);
              }
  
              while (k < trans.length) {
                if (trans[k][0] !== trans[k - 1][0]) {
                  part.push([]);
                  m++;
                }
                grp[trans[k][1]] = m;
                part[m].push(trans[k][1]);
                k++;
              }
            }
          }
        }
      }
  
      for (let i = 0; i < part.length; i++) {
        for (let j = 0; j < part[i].length; j++) {
          if (part[i][j] === 0) strt = i;
        }
      }
  
      // vector<tuple<int,int,bool> > ret(part.size());
      let ret = [...Array(part.length)];
      for (let i = 0; i < part.length; i++) {
        //cout<<grp[part[i][0]]<<endl;
        let astate = dfa[part[i][0]].a[0] >= 0 ? grp[dfa[part[i][0]].a[0]] : -1;
        let bstate = dfa[part[i][0]].a[1] >= 0 ? grp[dfa[part[i][0]].a[1]] : -1;
        let fstate = dfa[part[i][0]].f;
        let temp = {
          a: astate,
          b: bstate,
          final: fstate
        };
        ret[i] = temp;
      }
  
      return [strt, ret];
    }
    function stringcheck(input)
    {   
        let ret=minimize_dfa(dfa);
        let g=ret[1];
        let st_st=ret[0];
        let  curr_state,next_state;
        curr_state=st_st;
        
        for( let i=0;i<input.length;i++){
          
            if(input[i]=='0')
            {
                next_state=g[curr_state].a;
            }
            else
            {
               next_state=g[curr_state].b;
            }
           
            curr_state=next_state;
        }
       
        if(curr_state>=0&&g[curr_state].final===true)
            return true; 
        else
            return false;
    }
    let isaccepted=stringcheck(props.string);
    let result;
    if(isaccepted)
    {
        result=<p>This string accepted by this regular expression</p>    
    }
    else
    {
        result=<p>This string is not accepted by this regular expression</p> 
    }

      
    return(
    <div >
          {result}
   </div>)













}
export default Checker;