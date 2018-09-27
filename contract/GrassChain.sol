pragma solidity ^0.4.23;
//pragma experimental ABIEncoderV2;

contract GrassChain {

    struct producer {
        address prodAddr;   // 생산자 Wallet 주소
        uint prodID;        // 생산자 ID
        uint prodCert;      // 생산자의 인증 정보 (유기농, 무농약 등)
    }

    struct GSC { //grasschain supply chain
        address mainWallet;   // GRC 분배를 위한 중앙 지갑 주소 = 0x669795B7e30a4A56AE8BfF70efe6f48cDB3f73AD;
        address[] Gchain;     // 공급망 정보
        uint value;           // 계약에 따라 설정된 판매가
        uint deposit;         // 생산자 보증금
        uint[] ratio;         // 대금 분배 비율 설정
        uint Gchain_all;      // 전체 비율의 합
        uint status;          // GSC 상태 [0 : 생성 / 1 : 결제대기 / 2 : 결제완료]
        address[] history;    // 유통 기록
        uint256[] timestamp;  // 유통 시간 기록
    }
    
    /*
    * Testcase 1
    *
    * address   mainWallet = 0x669795B7e30a4A56AE8BfF70efe6f48cDB3f73AD;
    * address[] Gchain = ["0x7ED01f745fE3C87928D9743D15C96272037BC69c", "0x8CAd9B4941aAfb67b5A5e6DeA657Db2d4ea7b757", "0x3517a222d91fBEb2A338a6aEd3599DD0EC3AC55F", "0x30EeA5993ad9536BFA5BFb5957486F7FCBACabD8"];
    * uint      value; = 1000000000000000000 (wei) == 1 (ether)
    * uint      deposit; = 100000000000000000 (wei) == 0.1 (ether)
    * uint      Gchain_all = 100;
    * uint[]    Gchain_dist = [40, 30, 29, 0]; 
    */

    uint public GSCCount = 0;
    mapping (uint => GSC) public GSCList; //map id to GSC struct   prev : GSC[] GSCList;

    function createGSC(address[] Gchain, uint value, uint[] ratio) public payable returns (uint GSCID)
    {
        GSCID = GSCCount;
        GSCCount = GSCCount+1;

        uint sum = 0;
        for(uint n = 0; n < ratio.length; n++) sum += ratio[n];

        address[] temp1;
        uint256[] temp2;

        temp1[0] = msg.sender;
        temp2[0] = block.timestamp;

        GSCList[GSCID] = GSC(0x669795B7e30a4A56AE8BfF70efe6f48cDB3f73AD, Gchain, value, msg.value, ratio, sum, 0, temp1, temp2);
        //value for supply deposit
    }

    function getGSCAddr(uint GSCID) view public returns (address[] Gchain)
    {
        GSC G = GSCList[GSCID];
        Gchain = G.Gchain;
    }
    function getGSCHistory(uint GSCID) view public returns (address[] history)
    {
        GSC G = GSCList[GSCID];
        history = G.history;
    }
    function getGSCTimestamp(uint GSCID) view public returns (uint[] timestamp)
    {
        GSC G = GSCList[GSCID];
        timestamp = G.timestamp;
    }
    function getGSCRatio(uint GSCID) view public returns (uint[] ratio)
    {
        GSC G = GSCList[GSCID];
        ratio = G.ratio;
    }
    //protoVersion
    /*
    constructor() payable public
    {
        Gchain.push(msg.sender);
        deposit = msg.value;
        //value = msg.value / 2;
        //if (2 * value != msg.value) throw;
    }
    */

    event aborted();
    event purchaseConfirmed();
    event paymentDone();

    /// 구매를 중지하고 이더를 되찾는다.
    /// Only Distributor can abort contract
    function abort(uint GSCID) public
    {
        GSC G = GSCList[GSCID];
        if(G.status != 0) revert(); //부적절한 요청 시 거절
        emit aborted();
        G.status = 2; //inactive
    }

    function verify(uint GSCID) public
    {
        GSC G = GSCList[GSCID];
        if(G.status == 2) revert();
        G.history.push(msg.sender);
        G.timestamp.push(block.timestamp);
    }

    /// Confirmation&Payment of Customer
    /// 송금 작업 진행
    function pay(uint GSCID) public payable
        //onlyCustomer
        //inState(State.Locked)
    {
        //value = msg.value;  //value customer pays
        GSC G = GSCList[GSCID];
        if(G.status == 2) revert();
        
        G.Gchain[0].transfer(G.deposit);
        for(uint i = 0; i < G.Gchain.length; i++){
            G.Gchain[i].transfer((G.value/G.Gchain_all) * G.ratio[i]);
        }
        G.mainWallet.transfer((G.value/G.Gchain_all) * 1); //1% fee to main wallet // todo:change this to smart contract GRC
        G.status = 2;

        emit paymentDone();
        //make this contract inactive and finish
    }
}