// Read inputs from Standard Input (use readline()).
// Write outputs to Standard Output (use print()).

var n = readline();

nodes = {};
potentialRoots = {influences:{}};

for (var i = 0; i < n; i++) {
    var node1,node2;
    var relation = readline().split(" ");
    if ( !nodes[ relation[0] ] ) {
        potentialRoots.influences[ relation[0] ] = nodes[ relation[0] ] = {influences:[]};
    }
    node1 = nodes[ relation[0] ];
    if ( !nodes[ relation[1] ] ) {
        nodes[ relation[1] ] = {influences:[]};
    }
    node2 = nodes[ relation[1] ];
    delete potentialRoots.influences[ relation[1] ];
    
    node1.influences.push(node2);
}


lookupMaxDepth = function( node, currentDepth ) {
    //print("one loopkup");
    var depth = currentDepth;
    for( var j in node.influences ) {
        //print("loop")
        depth = Math.max( depth, lookupMaxDepth(node.influences[j], currentDepth+1) );
    }
    return depth;
}

print( lookupMaxDepth(potentialRoots,0) );