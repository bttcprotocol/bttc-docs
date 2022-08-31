# 資產映射

映射是資產跨鏈轉移的重要步驟。所謂映射，就是利用兩個網絡（比如TRON和BTTC）上的智能合約進行資產的一一對應，便於諸如鎖定、銷毀以及轉移等操作。

## 介紹

下文的描述中，“根鏈”或“公共區塊鏈”代表如TRON或者以太坊，“子鏈”或“側鏈”則代表BTTC主網。

如果您的代幣合約部署在根鏈上，並想將其轉移到子鏈，那麽這篇文檔將給予足夠的指引；如果您的代幣合約部署在子鏈上，或您允許此代幣在側鏈增發，這將是一種不同的情況，我們稱為BTTC Mintable Assets，請參看本頁“可鑄造代幣”。

下面是一些合約代碼示例，您可以對這些示例進行更改，但BTTC上的代幣必須確保合約擁有`deposit`、`withdrawTo`以及`mint`功能。

## 子代幣合約

**子合約必須滿足如下條件：**
+ 繼承[ChildERC20](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol)。其中`childChainManagerProxy`地址必須為`0x9a15f3a682d086c515be4037bda3b0676203a8ef`。

**NOTE：**
1. 每當從根鏈上發起存款請求時，`ChildChainManagerProxy`合約都會調用`deposit`方法。這個方法會在子鏈上鑄造代幣。
2. 您必須確保`withdrawTo`是始終可用的，因為它將被用於燃燒子鏈上的代幣。燃燒是取款過程的第一步，也是維持代幣總發行量不變的重要步驟。

### 標準子代幣

如果您需要映射的代幣是標準的TRC-20或TRC-721合約，請部署好合約後，在[這里](https://docs.google.com/forms/d/e/1FAIpQLScP1R7iB6s16CNKAZGjFH8mwDBi74wH_swzZvz3FGmjgUG33w/viewform)提交映射請求。

您可以通過以下鏈接來確定您的代幣是否為標準合約：
+ [TRC-20](https://github.com/tronprotocol/TIPs/blob/master/tip-20.md)
+ [TRC-721](https://github.com/tronprotocol/tips/blob/master/tip-721.md)

### 自定義子代幣

如果您需要映射自定義（非標準）的代幣，首先您需要在子鏈上自行部署代幣合約，然後在[這里](https://docs.google.com/forms/d/e/1FAIpQLScP1R7iB6s16CNKAZGjFH8mwDBi74wH_swzZvz3FGmjgUG33w/viewform)提交映射請求。請確保在提交請求時您提供了準確的代幣信息。

下面是一個創建自定義子代幣的例子：

```
注：子代幣合約的構造器中不進行代幣鑄造。
```

### 實現

上文已經介紹了子代幣合約必須滿足的條件及其原因，下面就是按照要求來實現它。

```
注：只有代理合約能調用deposit方法。
```


```js
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControlMixin} from "../../common/AccessControlMixin.sol";
import {IChildToken} from "./IChildToken.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";


contract ChildERC20 is
    ERC20,
    IChildToken,
    AccessControlMixin,
    NativeMetaTransaction,
    ContextMixin
{
    bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address childChainManager
    ) public ERC20(name_, symbol_) {
        _setupContractId("ChildERC20");
        _setupDecimals(decimals_);
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender()); //Optional. Required for extra issurance on BTTC
        _setupRole(DEPOSITOR_ROLE, childChainManager);
        _initializeEIP712(name_);
    }

    // This is to support Native meta transactions
    // never use msg.sender directly, use _msgSender() instead
    function _msgSender()
        internal
        override
        view
        returns (address payable sender)
    {
        return ContextMixin.msgSender();
    }

    /**
     * @notice called when token is deposited on root chain
     * @dev Should be callable only by ChildChainManager
     * Should handle deposit by minting the required amount for user
     * Make sure minting is done only by this function
     * @param user user address for whom deposit is being done
     * @param depositData abi encoded amount
     */
    function deposit(address user, bytes calldata depositData)
        external
        override
        only(DEPOSITOR_ROLE)
    {
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }

    /**
     * @notice called when user wants to withdraw tokens back to root chain
     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
     * @param amount amount of tokens to withdraw
     */
    function withdrawTo(address to, uint256 amount) public {
        _burn(_msgSender(), amount);
        emit WithdrawTo(to, address(0x00), amount);
    }

    function withdraw(uint256 amount) external {
        withdrawTo(_msgSender(), amount);
    }
}
```

步驟：

+ 在根鏈上部署根代幣，例如：TRON
+ 確保子代幣有`deposit`以及`withdrawTo`方法，並繼承[ChildERC20](https://github.com/bttcprotocol/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol)
+ 在BTTC上部署子代幣，
+ 提交一個映射請求


注：
1. 多數情況下，代幣無需在BTTC上增發，僅`ChildChainManager`合約擁有該代幣在BTTC上的鑄幣權（即`_setupRole(DEPOSITOR_ROLE, childChainManager)`）。無需在BTTC上增發時，除`ChildChainManager`之外的任何賬戶或合約擁有鑄幣權都會導致審核失敗，因為多余的授權會帶來增發的風險。
 
2. 對於無需在BTTC上增發的代幣，若已經部署且授權，可以通過調用`revoke`或`renounce`方法放棄自己的權限，我們將會審核多余的鑄幣權是否已被放棄；如果無法放棄權限，請重新部署合約。



## 可鑄造代幣

資產可通過PoS橋在公共區塊鏈和BTTC之間轉移，多數資產需要預先存在公共區塊鏈上。另一種選擇是在BTTC上直接創建代幣，並在需要時將其轉移到公共區塊鏈上。與公共區塊鏈相比，在BTTC上發行代幣手續費較低，且速度更快。這種代幣被稱為BTTC可鑄造資產。

當BTTC的可鑄造資轉移到公共區塊鏈時，必須先在BTTC上銷毀該代幣，並在公共區塊鏈上提交此次的銷毀證明。`RootChainManager`合約在內部調用一個特殊的合約，它能直接在公共區塊鏈上調用代幣的鑄造方法，並將代幣鑄造到用戶地址。這個特殊的合約是`MintableAssetPredicate`。

### 部署在公共區塊鏈上的合約

最重要的一點是，部署在公共區塊鏈代幣合約需要指定公共區塊鏈上的`MintableAssetProxy`(例如：`MintableERC20Proxy`。Asset表示資產類型，下同) 合約為鑄幣者。只有`MintableAssetPredicate`合約有權在公共區塊鏈上鑄幣。

這個角色可以通過調用根鏈上代幣合約的`grantRole`方法來授予。第一個參數是`PREDICATE_ROLE`常量值，即`0x12ff340d0cd9c652c747ca35727e68c547d0f0bfa7758d2e77f75acef481b4f2`，第二個參數是相應的`Predicate`合約地址。

## 提交映射請求

請在[這里](https://docs.google.com/forms/d/e/1FAIpQLScsdmIx3Ux_5P8T1ffmoPWipn7XD46GZEz-xbjwGdBrCGoCZg/viewform)提交映射請求。
