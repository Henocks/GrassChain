const ABI = [{"constant":true,"inputs":[],"name":"GSCCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"getGSCHistory","outputs":[{"name":"history","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"GSCList","outputs":[{"name":"mainWallet","type":"address"},{"name":"value","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"Gchain_all","type":"uint256"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"verify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"getGSCRatio","outputs":[{"name":"ratio","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"pay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"getGSCAddr","outputs":[{"name":"Gchain","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"Gchain","type":"address[]"},{"name":"value","type":"uint256"},{"name":"ratio","type":"uint256[]"}],"name":"createGSC","outputs":[{"name":"GSCID","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"abort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"GSCID","type":"uint256"}],"name":"getGSCTimestamp","outputs":[{"name":"timestamp","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[],"name":"aborted","type":"event"},{"anonymous":false,"inputs":[],"name":"purchaseConfirmed","type":"event"},{"anonymous":false,"inputs":[],"name":"paymentDone","type":"event"}];
const contractAddr = "0xE8720CB8b80ffb4D93BeE736C624dc547603fc49";
const GABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vaultID","type":"uint256"}],"name":"terminateGRC","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"vaultList","outputs":[{"name":"master","type":"address"},{"name":"value","type":"uint256"},{"name":"total","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"depositGRC","outputs":[{"name":"success","type":"bool"},{"name":"vID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vaultID","type":"uint256"}],"name":"stakeGRC","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}];
const grcAddr = "0x1179cf51c590794b0897586bc83a8d82ef8a243b";

// MetaMask injects the web3 library
window.onload = function () {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GrcContract = web3.eth.contract(GABI).at(grcAddr);

    if (typeof web3 === 'undefined') {
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
    }
    GchContract.GSCCount.call(function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('gscCounter').innerHTML = '<h2>현재 총 ' + result + '개의 GSC가 생성되었습니다.</h2>'
        } else {
            console.log("GSCCount error!");
        }
    });

    GrcContract.balanceOf(web3.eth.coinbase, {
        from: web3.eth.coinbase,
        to: grcAddr,
        value: 0
    }, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('grcCounter').innerHTML = '<h2>당신의 GrassCoin 잔고 : ' + numberComma(result) + 'GRC (KRW ' + numberComma(result*13) + ')</h2>'
        } else {
            console.log("GRCCount error!");
        }
    });
}

function create() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var Gchain;
    var Value = web3.toWei(document.getElementById("value").value, 'ether');
    var Ratio;// = [8, 8, 8];
    Gchain = document.getElementById("addrList").value.split(',');
    Ratio = document.getElementById("distList").value.split(',');

    GchContract.createGSC(Gchain, Value, Ratio, {
        from: web3.eth.coinbase,
        to: contractAddr,
        value: web3.toWei(document.getElementById("deposit").value, 'ether')
    }, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('response').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
            document.getElementById('response').innerHTML = '<pre>' + error + '</pre>'
        }
    });
}

function createTag() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GSCID = document.getElementById("qrID").value;
    var Response;
    var Gdat = new Array();

    GchContract.GSCList.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            Gdat = result;

            Response = 'GSC ID : ' + GSCID + '<br>Item Price : ' + web3.fromWei(Gdat[1], 'ether') + '(ether)' +'<br>Producer Deposit : ' + web3.fromWei(Gdat[2], 'ether') + '(ether)';
            document.getElementById('qrResponse').innerHTML = Response;
        } else {
            document.getElementById('qrResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
    document.getElementById("qrcode").innerHTML = "";
    var qrCode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });
    qrCode.makeCode("GSC ID : "+GSCID);
}

function printTag(){
    var initBody = document.body.innerHTML;

    window.onbeforeprint = function () {
        document.body.innerHTML = document.getElementById("tag").innerHTML;
    }
    window.onafterprint = function () {
        document.body.innerHTML = initBody;
    }
    window.print();
}

function track() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GSCID = document.getElementById("trackID").value;
    var Ratio = new Array();
    var Gdat = new Array();
    var Ghistory = new Array();
    var Gtimestamp = new Array();

    GchContract.GSCList.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            Gdat = result;
        } else {
            document.getElementById('verifyResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
    GchContract.getGSCRatio.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            Ratio = result[0];
        } else {
            console.log("error");
        }
    });
    GchContract.getGSCHistory.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            Ghistory = result;
        } else {
            console.log("error");
        }
    });
    GchContract.getGSCTimestamp.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            Gtimestamp = result;
        } else {
            console.log("error");
        }
    });
    GchContract.getGSCAddr.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            var Response =
                'Track Success!<br><br>GSC ID : '
                + GSCID + '<br>GSC Status : ' + Gdat[4] +
                '<br>Item Price : '
                + web3.fromWei(Gdat[1], 'ether') +
                '(ether)'
                +'<br>Producer Deposit : '
                + web3.fromWei(Gdat[2], 'ether') +
                '(ether)'
                +
                '<br><br>Address List : <br>';
            var n;
            for(n = 0; n<result.length; n++){
                Response = Response + '<a href="https://ropsten.etherscan.io/address/' + result[n] + '">' + result[n] + '</a><br>';
            }
            Response += '<br>Supply History : <br>';
            for(n = GSCID; n<Ghistory.length; n++){
                var sysdate = new Date(Gtimestamp[n]*1000);
                if (Gtimestamp[n] == 0) continue;
                Response = Response + '<a href="https://ropsten.etherscan.io/address/' + Ghistory[n] + '">' + Ghistory[n] + '</a><br>' + sysdate.toLocaleDateString() +' ' +sysdate.toLocaleTimeString()+'<br>';
            }
            Response += '<br>Master Wallet : <br>' + '<a href="https://ropsten.etherscan.io/address/' + Gdat[0] + '">' + Gdat[0] + '</a><br>'
            document.getElementById('trackResponse').innerHTML = Response;
        } else {
            document.getElementById('trackResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
}

function verify() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GSCID = document.getElementById("verifyID").value;
    GchContract.verify(GSCID, {
        from: web3.eth.coinbase,
        to: contractAddr,
        value: '0'//web3.toWei('0', 'ether')
    }, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('verifyResponse').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
            document.getElementById('verifyResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
}

function payCheck() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GSCID = document.getElementById("payID").value;

    GchContract.GSCList.call(GSCID, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('Gprice').innerHTML = web3.fromWei(result[1], 'ether');
        } else {
        }
    });

}

function pay() {
    var GchContract = web3.eth.contract(ABI).at(contractAddr);
    var GSCID = document.getElementById("payID").value;

    GchContract.pay(GSCID, {
        from: web3.eth.coinbase,
        to: contractAddr,
        value: web3.toWei(document.getElementById('Gprice').innerHTML, 'ether')
    }, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('payResponse').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
            document.getElementById('payResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
    /*
    GchContract.pay(GSCID, {
        from: web3.eth.coinbase,
        to: contractAddr,
        value: Value[1]
    }, function (error, result) {
        if (!error) {
            console.log(result);
            document.getElementById('payResponse').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
            document.getElementById('payResponse').innerHTML = '<pre>' + error + '</pre>'
        }
    });
    */
}

function numberComma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}