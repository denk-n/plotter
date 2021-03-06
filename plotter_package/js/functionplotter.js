/*
modified by Marcus Oettinger 6/2015
 - reworked for smoother Color handling
-------------------------------------------------------------------------

Original source: http://rechneronline.de/function-graphs/
#########################################################
Copyright (C) 2011 Juergen Kummer

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

These javascript-functions are needed by the main page, even though
most of the plotter will work without.
*/

function getgraph() {
	document.getElementById('funcs').submit();
	intsopen();
	checkscroll();
	document.getElementById("formula1").focus();
                 for (i=0; i<8; i++) {
		changeselfcol(i);
	}

}

function setback() {
	if (confirm('Delete all changes?')) {
		document.getElementById('funcs').reset();
	getgraph();
	}
}

function intsopen() {
         if(document.getElementsByName('sint1')[2].checked)
         	intshow(1);
         else
         	intclose(1);
         if(document.getElementsByName('sint2')[2].checked)
         	intshow(2);
         else
         	intclose(2);
         if(document.getElementsByName('sint3')[2].checked)
         	intshow(3);
         else
         	intclose(3);
}

function intshow(x) {
	document.getElementById("formula"+x).style.width="120px";
	document.getElementById("intc"+x).style.display="inline";
	document.getElementById("cint"+x).focus();
}

function intclose(x) {
	document.getElementById("formula"+x).style.width="190px";
	document.getElementById("intc"+x).style.display="none";
}

function loadg() {
	var pp=document.getElementById("path").value;
	if(!pp) return false;

	document.getElementById("formula1").value=pp.substring(pp.indexOf("&a1=")+4,pp.indexOf("&a2="));
	document.getElementById("formula2").value=pp.substring(pp.indexOf("&a2=")+4,pp.indexOf("&a3="));
	document.getElementById("formula3").value=pp.substring(pp.indexOf("&a3=")+4,pp.indexOf("&a7="));
	document.getElementById("term1").checked=pp.substring(pp.indexOf("&a7=")+4,pp.indexOf("&a8="));
	document.getElementById("term2").checked=pp.substring(pp.indexOf("&a8=")+4,pp.indexOf("&a9="));
	document.getElementById("term3").checked=pp.substring(pp.indexOf("&a9=")+4,pp.indexOf("&b0="));
	document.getElementById("width").value=pp.substring(pp.indexOf("&b0=")+4,pp.indexOf("&b1="));
	document.getElementById("height").value=pp.substring(pp.indexOf("&b1=")+4,pp.indexOf("&b2="));
	document.getElementById("rulex1").value=pp.substring(pp.indexOf("&b2=")+4,pp.indexOf("&b3="));
	document.getElementById("rulex2").value=pp.substring(pp.indexOf("&b3=")+4,pp.indexOf("&b4="));
	document.getElementById("ruley1").value=pp.substring(pp.indexOf("&b4=")+4,pp.indexOf("&b5="));
	document.getElementById("ruley2").value=pp.substring(pp.indexOf("&b5=")+4,pp.indexOf("&b6="));
	document.getElementById("intervalsx").value=pp.substring(pp.indexOf("&b6=")+4,pp.indexOf("&b7="));
	document.getElementById("intervalsy").value=pp.substring(pp.indexOf("&b7=")+4,pp.indexOf("&b8="));
	document.getElementById("linex").value=pp.substring(pp.indexOf("&b8=")+4,pp.indexOf("&b9="));
	document.getElementById("liney").value=pp.substring(pp.indexOf("&b9=")+4,pp.indexOf("&c0="));
	document.getElementById("deci").value=pp.substring(pp.indexOf("&c0=")+4,pp.indexOf("&c1="));
	document.getElementById("mid").value=pp.substring(pp.indexOf("&c1=")+4,pp.indexOf("&c2="));
	document.getElementById("lines").checked=pp.substring(pp.indexOf("&c2=")+4,pp.indexOf("&c3="));
	document.getElementById("numbers").checked=pp.substring(pp.indexOf("&c3=")+4,pp.indexOf("&c4="));
	document.getElementById("dashes").checked=pp.substring(pp.indexOf("&c4=")+4,pp.indexOf("&c5="));
	document.getElementById("frame").checked=pp.substring(pp.indexOf("&c5=")+4,pp.indexOf("&c6="));
	document.getElementById("errors").checked=pp.substring(pp.indexOf("&c6=")+4,pp.indexOf("&c7="));

	var s1=pp.substring(pp.indexOf("&c7=")+4,pp.indexOf("&c8="));
	var s2=pp.substring(pp.indexOf("&c8=")+4,pp.indexOf("&c9="));
	var s3=pp.substring(pp.indexOf("&c9=")+4,pp.indexOf("&d0="));
	if(!s1) s1=0;
	if(!s2) s2=0;
	if(!s3) s3=0;
	document.getElementsByName("sint1")[s1].checked=1;
	document.getElementsByName("sint2")[s2].checked=1;
	document.getElementsByName("sint3")[s3].checked=1;
	intsopen();

	document.getElementById("grid").checked=pp.substring(pp.indexOf("&d0=")+4,pp.indexOf("&d1="));
	document.getElementById("gridx").value=pp.substring(pp.indexOf("&d1=")+4,pp.indexOf("&d2="));
	document.getElementById("gridy").value=pp.substring(pp.indexOf("&d2=")+4,pp.indexOf("&d3="));

	var jslogskx=pp.substring(pp.indexOf("&g5=")+4,pp.indexOf("&g6="));
	if(jslogskx!=0 && jslogskx!=2 && jslogskx!="M_E" && jslogskx!=10 && jslogskx!=100) {
		document.getElementById("logskix").value=jslogskx;
		clrlog('x');
	} else {
		document.getElementById("logskix").value="";
		if(jslogskx==0)
			document.getElementsByName("logskx")[0].checked=1;
		else if(jslogskx==2)
			document.getElementsByName("logskx")[1].checked=1;
		else if(jslogskx=="M_E")
			document.getElementsByName("logskx")[2].checked=1;
		else if(jslogskx==10)
			document.getElementsByName("logskx")[3].checked=1;
		else if(jslogskx==100)
			document.getElementsByName("logskx")[4].checked=1;
	}

	var jslogsk=pp.substring(pp.indexOf("&d3=")+4,pp.indexOf("&d4="));
	if(jslogsk!=0 && jslogsk!=2 && jslogsk!="M_E" && jslogsk!=10 && jslogsk!=100) {
		document.getElementById("logski").value=jslogsk;
		clrlog('');
	} else {
		document.getElementById("logski").value="";
		if(jslogsk==0)
			document.getElementsByName("logsk")[0].checked=1;
		else if(jslogsk==2)
			document.getElementsByName("logsk")[1].checked=1;
		else if(jslogsk=="M_E")
			document.getElementsByName("logsk")[2].checked=1;
		else if(jslogsk==10)
			document.getElementsByName("logsk")[3].checked=1;
		else if(jslogsk==100)
			document.getElementsByName("logsk")[4].checked=1;
	}

	document.getElementById("ta1").value=pp.substring(pp.indexOf("&d4=")+4,pp.indexOf("&d5="));
	document.getElementById("ta2").value=pp.substring(pp.indexOf("&d5=")+4,pp.indexOf("&d6="));
	document.getElementById("tb1").value=pp.substring(pp.indexOf("&d6=")+4,pp.indexOf("&d7="));
	document.getElementById("tb2").value=pp.substring(pp.indexOf("&d7=")+4,pp.indexOf("&d8="));
	document.getElementById("tc1").value=pp.substring(pp.indexOf("&d8=")+4,pp.indexOf("&d9="));
	document.getElementById("tc2").value=pp.substring(pp.indexOf("&d9=")+4,pp.indexOf("&e0="));
	document.getElementById("cint1").value=pp.substring(pp.indexOf("&e0=")+4,pp.indexOf("&e1="));
	document.getElementById("cint2").value=pp.substring(pp.indexOf("&e1=")+4,pp.indexOf("&e2="));
	document.getElementById("cint3").value=pp.substring(pp.indexOf("&e2=")+4,pp.indexOf("&e3="));
	document.getElementById("qq").value=pp.substring(pp.indexOf("&e3=")+4,pp.indexOf("&e4="));
	document.getElementById("bg").value=pp.substring(pp.indexOf("&e4=")+4,pp.indexOf("&e5="));
	document.getElementById("gapc").value=pp.substring(pp.indexOf("&e5=")+4,pp.indexOf("&e6="));
	document.getElementById("capt").value=pp.substring(pp.indexOf("&e6=")+4,pp.indexOf("&e7="));
	document.getElementById("linec").value=pp.substring(pp.indexOf("&e7=")+4,pp.indexOf("&e8="));
	document.getElementById("con0").value=pp.substring(pp.indexOf("&e8=")+4,pp.indexOf("&e9="));
	document.getElementById("con1").value=pp.substring(pp.indexOf("&e9=")+4,pp.indexOf("&f0="));
	document.getElementById("con2").value=pp.substring(pp.indexOf("&f0=")+4,pp.indexOf("&f1="));
	document.getElementById("anti").checked=pp.substring(pp.indexOf("&f1=")+4,pp.indexOf("&f2="));
	document.getElementById("gamma").value=pp.substring(pp.indexOf("&f2=")+4,pp.indexOf("&f3="));
	document.getElementById("bri").value=pp.substring(pp.indexOf("&f3=")+4,pp.indexOf("&f4="));
	document.getElementById("cont").value=pp.substring(pp.indexOf("&f4=")+4,pp.indexOf("&f5="));
	document.getElementById("emb").checked=pp.substring(pp.indexOf("&f5=")+4,pp.indexOf("&f6="));
	document.getElementById("blur").checked=pp.substring(pp.indexOf("&f6=")+4,pp.indexOf("&f7="));
	document.getElementById("neg").checked=pp.substring(pp.indexOf("&f7=")+4,pp.indexOf("&f8="));
	document.getElementById("gray").checked=pp.substring(pp.indexOf("&f8=")+4,pp.indexOf("&f9="));
	document.getElementById("mean").checked=pp.substring(pp.indexOf("&f9=")+4,pp.indexOf("&g0="));
	document.getElementById("edge").checked=pp.substring(pp.indexOf("&g0=")+4,pp.indexOf("&g1="));
	document.getElementById("bf").value=pp.substring(pp.indexOf("&g1=")+4,pp.indexOf("&g2="));
	document.getElementById("pol").checked=pp.substring(pp.indexOf("&g2=")+4,pp.indexOf("&g3="));
	document.getElementById("rotate").value=pp.substring(pp.indexOf("&g3=")+4,pp.indexOf("&g4="));
	document.getElementById("filetype").value=pp.substring(pp.indexOf("&g4=")+4,pp.indexOf("&g5="));
	document.getElementById("Y").value=pp.substring(pp.indexOf("&g6=")+4,pp.indexOf("&g7="));
	document.getElementById("selfcol0").value=pp.substring(pp.indexOf("&g7=")+4,pp.indexOf("&g8="));
	document.getElementById("selfcol1").value=pp.substring(pp.indexOf("&g8=")+4,pp.indexOf("&g9="));
	document.getElementById("selfcol2").value=pp.substring(pp.indexOf("&g9=")+4,pp.indexOf("&h0="));
	document.getElementById("thick").value=pp.substring(pp.indexOf("&h0=")+4,pp.indexOf("&z"));

	getgraph();
};

function clrlog(a) {
	for(var i=0;i<5;i++)
		document.getElementsByName("logsk"+a)[i].checked=0;
}

function showins() {
	if(document.getElementById("instructions").style.display=="none") {
		document.getElementById("instructions").style.display="block";
		if(!document.getElementById("instructions").src)
			document.getElementById("instructions").src="instructions.html";
	}
}

function hideins() {
	document.getElementById("instructions").style.display="none";
}

function checkscroll() {
	if(document.getElementById("rotate").value/90!=Math.round(document.getElementById("rotate").value/90))
		document.getElementById("function").scrolling="yes";
	else
		document.getElementById("function").scrolling="no";
}

function standard() {
// TODO: colors!!
	if (confirm('Set to standard display values?')) {
		document.getElementById("filetype").value=0;
		document.getElementById("bg").value=14;
		document.getElementById("capt").value=13;
		document.getElementById("linec").value=12;
		document.getElementById("gapc").value=14;
		document.getElementById("grid").checked=1;
		document.getElementById("lines").checked=1;
		document.getElementById("numbers").checked=1;
		document.getElementById("dashes").checked=1;
		document.getElementById("frame").checked=1;
		document.getElementById("errors").checked=1;
		document.getElementById("anti").checked=1;
		document.getElementById("pol").checked=1
		document.getElementById("bf").value=1;
		document.getElementById("gamma").value=1;
		document.getElementById("bri").value=0;
		document.getElementById("cont").value=0;
		document.getElementById("rotate").value=0;
		document.getElementById("emb").checked=0;
		document.getElementById("blur").checked=0;
		document.getElementById("neg").checked=0;
		document.getElementById("gray").checked=0;
		document.getElementById("mean").checked=0;
		document.getElementById("edge").checked=0;
		document.getElementById("width").value=500;
		document.getElementById("height").value=500;
		document.getElementById("thick").value=1;
		getgraph();
	}
}

function getalign(x) {
	var v=document.getElementById("qsize").value.replace(",",".");
	document.getElementById("rulex1").value=-v;
	document.getElementById("rulex2").value=v;
	document.getElementById("ruley1").value=-v;
	document.getElementById("ruley2").value=v;
	if(x=="a0") {
		document.getElementById("rulex1").value=0;
		document.getElementById("rulex2").value=2*v;
		document.getElementById("ruley1").value=0;
		document.getElementById("ruley2").value=2*v;
	} else if(x=="a1") {
		document.getElementById("rulex1").value=-2*v;
		document.getElementById("rulex2").value=0;
		document.getElementById("ruley1").value=0;
		document.getElementById("ruley2").value=2*v;
	} else if(x=="a2") {
		document.getElementById("rulex1").value=-2*v;
		document.getElementById("rulex2").value=0;
		document.getElementById("ruley1").value=-2*v;
		document.getElementById("ruley2").value=0;
	} else if(x=="a3") {
		document.getElementById("rulex1").value=0;
		document.getElementById("rulex2").value=2*v;
		document.getElementById("ruley1").value=-2*v;
		document.getElementById("ruley2").value=0;
	} else if(x=="b0") {
		document.getElementById("ruley1").value=0;
		document.getElementById("ruley2").value=2*v;
	} else if(x=="b1") {
		document.getElementById("rulex1").value=-2*v;
		document.getElementById("rulex2").value=0;
	} else if(x=="b2") {
		document.getElementById("ruley1").value=-2*v;
		document.getElementById("ruley2").value=0;
	} else if(x=="b3") {
		document.getElementById("rulex1").value=0;
		document.getElementById("rulex2").value=2*v;
	}
	getgraph();
}

function changeselfcol(x) {
	document.getElementById("selfcolbg"+x).style.backgroundColor='#'+document.getElementById("selfcol"+x).value;
	if (x<3) {
		document.getElementById("fl"+x).style.color='#'+document.getElementById("selfcol"+x).value;
	}
}

function changeinstrsize(x) {
	showins();
	for(var i=0;i<25;i++) {
		document.getElementById("slider"+i).style.fontWeight="normal";
		document.getElementById("slider"+i).style.fontSize="13px";
	}
	document.getElementById("slider"+x).style.fontWeight="bold";
	document.getElementById("slider"+x).style.fontSize="16px";
	var w=x*50+200;
	w+="px";
	document.getElementById("instructions").style.width=w;
}