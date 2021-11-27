(()=>{var __webpack_modules__={138:()=>{eval("let account\n\nconst initializeMina = async () => {\n  const onboardButton = document.getElementById('connectButton')\n  const getAccountsButton = document.getElementById('getAccounts')\n  const getAccountsResults = document.getElementById('getAccountsResult')\n\n  onboardButton.onclick = async () => {\n    if (!window.mina) {\n      alert(\"No provider was found 请先安装 auro-wallet\")\n    } else {\n      onboardButton.innerText = 'Onboarding in progress'\n      let data = await window.mina.requestAccounts().catch(err=>err)\n      if(data.message){\n        onboardButton.innerText = data.message\n      }else{\n        let approveAccount = data\n        account = approveAccount\n        document.getElementById('accounts').innerHTML = approveAccount;\n        onboardButton.innerText = 'Connected'\n        onboardButton.disabled = true\n      }\n    }\n  }\n  /**\n   * get account\n   */\n  getAccountsButton.onclick = async () => {\n    if (window.mina) {\n      let data = await window.mina.requestAccounts().catch(err=>err)\n      let approveAccount = data\n      if(data.message){\n        getAccountsResults.innerHTML = data.message\n      }else{\n        getAccountsResults.innerHTML = approveAccount;\n      }\n    }\n  }\n\n\n  const sendButton = document.getElementById('sendButton')\n  const sendAmountInput = document.getElementById('sendAmountInput')\n  const receiveAddressInput = document.getElementById('receiveAddressInput')\n  const sendResultDisplay = document.getElementById('sendResultDisplay')\n\n  /**\n   * transfer \n   */\n  sendButton.onclick = async () => {\n    let from = account && account.length > 0 ? account[0] : \"\"\n    let sendResult = await window.mina.sendPayment({\n      amount: sendAmountInput.value,\n      from: from,\n      to: receiveAddressInput.value,\n    }).catch(err=>err)\n    if(sendResult.hash){\n      sendResultDisplay.innerHTML = sendResult.hash\n    }else{\n      sendResultDisplay.innerHTML = sendResult.message\n    }\n  }\n\n\n  /**\n   * staking\n   */\n  const stakingButton = document.getElementById('stakingButton')\n  const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')\n  const stakingResultDisplay = document.getElementById('stakingResultDisplay')\n\n  stakingButton.onclick = async () => {//质押不用输入金额\n    let from = account && account.length > 0 ? account[0] : \"\"\n    let stakingResult = await window.mina.sendStakeDelegation({\n      from: from,\n      to: vaildatorAddressInput.value,\n    }).catch(err=>err)\n    if(stakingResult.hash){\n      stakingResultDisplay.innerHTML = stakingResult.hash\n    }else{\n      stakingResultDisplay.innerHTML = stakingResult.message\n    }\n  }\n  /**\n   * sign message\n   */\n  const signMessageButton = document.getElementById('signMessageButton')\n  const signMessageContent = document.getElementById('signMessageContent')\n  const signMessageResult = document.getElementById('signMessageResult')\n  const signVerifyButton = document.getElementById('signVerifyButton')\n  const verifyResult = document.getElementById('verifyResult')\n\n\n  let signResult\n\n  signMessageButton.onclick = async () => {\n    let from = account && account.length > 0 ? account[0] : \"\"\n    signResult = await window.mina.signMessage({\n      from: from,\n      message: signMessageContent.value,\n    }).catch(err=>err)\n    if(signResult.signature){\n      signMessageResult.innerHTML = JSON.stringify(signResult.signature)\n    }else{\n      signMessageResult.innerHTML = signResult.message\n    }\n  }\n\n  /**\n   * Verify Message\n   */\n  signVerifyButton.onclick = async () => {\n    let from = account && account.length > 0 ? account[0] : \"\"\n    let messageVerifyResult = await window.mina.verifyMessage({\n      publicKey:from,\n      signature:{\n        field:signResult?.signature?.field,\n        scalar:signResult?.signature?.scalar\n      },\n      payload:signMessageContent.value\n    }).catch(err=>err)\n    verifyResult.innerHTML = messageVerifyResult\n  }\n\n\n  setTimeout( async () => {\n    if (window.mina) {\n      window.mina.on('accountsChanged',handleNewAccounts)\n      window.mina.on('chainChanged',handleChainChange)\n      \n      let data = await window.mina.requestNetwork().catch(err=>err)\n      handleChainChange(data)\n    }\n  }, 200);\n\n  const networkDiv = document.getElementById('network')\n  function handleChainChange(newChain) {\n    networkDiv.innerHTML = newChain\n  }\n  \n\n  function handleNewAccounts(newAccounts) {\n    if (Array.isArray(newAccounts)) {\n      document.getElementById('accounts').innerHTML = newAccounts;\n      if (newAccounts.length === 0) {\n        onboardButton.innerText = 'Connect'\n        onboardButton.disabled = false\n      }\n    }\n  }\n}\nwindow.addEventListener('DOMContentLoaded', initializeMina)//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTM4LmpzIiwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3BsYXlncm91bmQvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYWNjb3VudFxuXG5jb25zdCBpbml0aWFsaXplTWluYSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgb25ib2FyZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0QnV0dG9uJylcbiAgY29uc3QgZ2V0QWNjb3VudHNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0QWNjb3VudHMnKVxuICBjb25zdCBnZXRBY2NvdW50c1Jlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2V0QWNjb3VudHNSZXN1bHQnKVxuXG4gIG9uYm9hcmRCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXdpbmRvdy5taW5hKSB7XG4gICAgICBhbGVydChcIk5vIHByb3ZpZGVyIHdhcyBmb3VuZCDor7flhYjlronoo4UgYXVyby13YWxsZXRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgb25ib2FyZEJ1dHRvbi5pbm5lclRleHQgPSAnT25ib2FyZGluZyBpbiBwcm9ncmVzcydcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd2luZG93Lm1pbmEucmVxdWVzdEFjY291bnRzKCkuY2F0Y2goZXJyPT5lcnIpXG4gICAgICBpZihkYXRhLm1lc3NhZ2Upe1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmlubmVyVGV4dCA9IGRhdGEubWVzc2FnZVxuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBhcHByb3ZlQWNjb3VudCA9IGRhdGFcbiAgICAgICAgYWNjb3VudCA9IGFwcHJvdmVBY2NvdW50XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cycpLmlubmVySFRNTCA9IGFwcHJvdmVBY2NvdW50O1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmlubmVyVGV4dCA9ICdDb25uZWN0ZWQnXG4gICAgICAgIG9uYm9hcmRCdXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBnZXQgYWNjb3VudFxuICAgKi9cbiAgZ2V0QWNjb3VudHNCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAod2luZG93Lm1pbmEpIHtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd2luZG93Lm1pbmEucmVxdWVzdEFjY291bnRzKCkuY2F0Y2goZXJyPT5lcnIpXG4gICAgICBsZXQgYXBwcm92ZUFjY291bnQgPSBkYXRhXG4gICAgICBpZihkYXRhLm1lc3NhZ2Upe1xuICAgICAgICBnZXRBY2NvdW50c1Jlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS5tZXNzYWdlXG4gICAgICB9ZWxzZXtcbiAgICAgICAgZ2V0QWNjb3VudHNSZXN1bHRzLmlubmVySFRNTCA9IGFwcHJvdmVBY2NvdW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgY29uc3Qgc2VuZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kQnV0dG9uJylcbiAgY29uc3Qgc2VuZEFtb3VudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmRBbW91bnRJbnB1dCcpXG4gIGNvbnN0IHJlY2VpdmVBZGRyZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjZWl2ZUFkZHJlc3NJbnB1dCcpXG4gIGNvbnN0IHNlbmRSZXN1bHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmRSZXN1bHREaXNwbGF5JylcblxuICAvKipcbiAgICogdHJhbnNmZXIgXG4gICAqL1xuICBzZW5kQnV0dG9uLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGZyb20gPSBhY2NvdW50ICYmIGFjY291bnQubGVuZ3RoID4gMCA/IGFjY291bnRbMF0gOiBcIlwiXG4gICAgbGV0IHNlbmRSZXN1bHQgPSBhd2FpdCB3aW5kb3cubWluYS5zZW5kUGF5bWVudCh7XG4gICAgICBhbW91bnQ6IHNlbmRBbW91bnRJbnB1dC52YWx1ZSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogcmVjZWl2ZUFkZHJlc3NJbnB1dC52YWx1ZSxcbiAgICB9KS5jYXRjaChlcnI9PmVycilcbiAgICBpZihzZW5kUmVzdWx0Lmhhc2gpe1xuICAgICAgc2VuZFJlc3VsdERpc3BsYXkuaW5uZXJIVE1MID0gc2VuZFJlc3VsdC5oYXNoXG4gICAgfWVsc2V7XG4gICAgICBzZW5kUmVzdWx0RGlzcGxheS5pbm5lckhUTUwgPSBzZW5kUmVzdWx0Lm1lc3NhZ2VcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBzdGFraW5nXG4gICAqL1xuICBjb25zdCBzdGFraW5nQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWtpbmdCdXR0b24nKVxuICBjb25zdCB2YWlsZGF0b3JBZGRyZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmFpbGRhdG9yQWRkcmVzc0lucHV0JylcbiAgY29uc3Qgc3Rha2luZ1Jlc3VsdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Rha2luZ1Jlc3VsdERpc3BsYXknKVxuXG4gIHN0YWtpbmdCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHsvL+i0qOaKvOS4jeeUqOi+k+WFpemHkeminVxuICAgIGxldCBmcm9tID0gYWNjb3VudCAmJiBhY2NvdW50Lmxlbmd0aCA+IDAgPyBhY2NvdW50WzBdIDogXCJcIlxuICAgIGxldCBzdGFraW5nUmVzdWx0ID0gYXdhaXQgd2luZG93Lm1pbmEuc2VuZFN0YWtlRGVsZWdhdGlvbih7XG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHZhaWxkYXRvckFkZHJlc3NJbnB1dC52YWx1ZSxcbiAgICB9KS5jYXRjaChlcnI9PmVycilcbiAgICBpZihzdGFraW5nUmVzdWx0Lmhhc2gpe1xuICAgICAgc3Rha2luZ1Jlc3VsdERpc3BsYXkuaW5uZXJIVE1MID0gc3Rha2luZ1Jlc3VsdC5oYXNoXG4gICAgfWVsc2V7XG4gICAgICBzdGFraW5nUmVzdWx0RGlzcGxheS5pbm5lckhUTUwgPSBzdGFraW5nUmVzdWx0Lm1lc3NhZ2VcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHNpZ24gbWVzc2FnZVxuICAgKi9cbiAgY29uc3Qgc2lnbk1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbk1lc3NhZ2VCdXR0b24nKVxuICBjb25zdCBzaWduTWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbk1lc3NhZ2VDb250ZW50JylcbiAgY29uc3Qgc2lnbk1lc3NhZ2VSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbk1lc3NhZ2VSZXN1bHQnKVxuICBjb25zdCBzaWduVmVyaWZ5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25WZXJpZnlCdXR0b24nKVxuICBjb25zdCB2ZXJpZnlSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmVyaWZ5UmVzdWx0JylcblxuXG4gIGxldCBzaWduUmVzdWx0XG5cbiAgc2lnbk1lc3NhZ2VCdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgZnJvbSA9IGFjY291bnQgJiYgYWNjb3VudC5sZW5ndGggPiAwID8gYWNjb3VudFswXSA6IFwiXCJcbiAgICBzaWduUmVzdWx0ID0gYXdhaXQgd2luZG93Lm1pbmEuc2lnbk1lc3NhZ2Uoe1xuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIG1lc3NhZ2U6IHNpZ25NZXNzYWdlQ29udGVudC52YWx1ZSxcbiAgICB9KS5jYXRjaChlcnI9PmVycilcbiAgICBpZihzaWduUmVzdWx0LnNpZ25hdHVyZSl7XG4gICAgICBzaWduTWVzc2FnZVJlc3VsdC5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShzaWduUmVzdWx0LnNpZ25hdHVyZSlcbiAgICB9ZWxzZXtcbiAgICAgIHNpZ25NZXNzYWdlUmVzdWx0LmlubmVySFRNTCA9IHNpZ25SZXN1bHQubWVzc2FnZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgTWVzc2FnZVxuICAgKi9cbiAgc2lnblZlcmlmeUJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBmcm9tID0gYWNjb3VudCAmJiBhY2NvdW50Lmxlbmd0aCA+IDAgPyBhY2NvdW50WzBdIDogXCJcIlxuICAgIGxldCBtZXNzYWdlVmVyaWZ5UmVzdWx0ID0gYXdhaXQgd2luZG93Lm1pbmEudmVyaWZ5TWVzc2FnZSh7XG4gICAgICBwdWJsaWNLZXk6ZnJvbSxcbiAgICAgIHNpZ25hdHVyZTp7XG4gICAgICAgIGZpZWxkOnNpZ25SZXN1bHQ/LnNpZ25hdHVyZT8uZmllbGQsXG4gICAgICAgIHNjYWxhcjpzaWduUmVzdWx0Py5zaWduYXR1cmU/LnNjYWxhclxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6c2lnbk1lc3NhZ2VDb250ZW50LnZhbHVlXG4gICAgfSkuY2F0Y2goZXJyPT5lcnIpXG4gICAgdmVyaWZ5UmVzdWx0LmlubmVySFRNTCA9IG1lc3NhZ2VWZXJpZnlSZXN1bHRcbiAgfVxuXG5cbiAgc2V0VGltZW91dCggYXN5bmMgKCkgPT4ge1xuICAgIGlmICh3aW5kb3cubWluYSkge1xuICAgICAgd2luZG93Lm1pbmEub24oJ2FjY291bnRzQ2hhbmdlZCcsaGFuZGxlTmV3QWNjb3VudHMpXG4gICAgICB3aW5kb3cubWluYS5vbignY2hhaW5DaGFuZ2VkJyxoYW5kbGVDaGFpbkNoYW5nZSlcbiAgICAgIFxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3aW5kb3cubWluYS5yZXF1ZXN0TmV0d29yaygpLmNhdGNoKGVycj0+ZXJyKVxuICAgICAgaGFuZGxlQ2hhaW5DaGFuZ2UoZGF0YSlcbiAgICB9XG4gIH0sIDIwMCk7XG5cbiAgY29uc3QgbmV0d29ya0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXR3b3JrJylcbiAgZnVuY3Rpb24gaGFuZGxlQ2hhaW5DaGFuZ2UobmV3Q2hhaW4pIHtcbiAgICBuZXR3b3JrRGl2LmlubmVySFRNTCA9IG5ld0NoYWluXG4gIH1cbiAgXG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3QWNjb3VudHMobmV3QWNjb3VudHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdBY2NvdW50cykpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cycpLmlubmVySFRNTCA9IG5ld0FjY291bnRzO1xuICAgICAgaWYgKG5ld0FjY291bnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmlubmVyVGV4dCA9ICdDb25uZWN0J1xuICAgICAgICBvbmJvYXJkQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZU1pbmEpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///138\n")}},__webpack_exports__={};__webpack_modules__[138](),window.playground=__webpack_exports__.playground})();