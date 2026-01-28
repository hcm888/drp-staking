'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// ✅ 你的合约ABI（完整内置，不用改）
const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"REFERRAL_","type":"address"},{"internalType":"address","name":"marketingAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"parent","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"DirectValidUserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"parent","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"DirectValidUserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"},{"indexed":true,"internalType":"address","name":"operator","type":"address"}],"name":"DirectValidUserVirtualCountLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint8","name":"t","type":"uint8"},{"indexed":true,"internalType":"uint8","name":"s","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint40","name":"ts","type":"uint40"}],"name":"EarningAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"oldLv","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"newLv","type":"uint8"}],"name":"LevelChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"stakeIndex","type":"uint8"},{"indexed":false,"internalType":"uint40","name":"ts","type":"uint40"}],"name":"OwnerStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint40","name":"ts","type":"uint40"}],"name":"OwnerUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint40","name":"timestamp","type":"uint40"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stakeTime","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawalToken","type":"event"},{"inputs":[],"name":"REFERRAL","outputs":[{"internalType":"contract IReferral","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"contract IToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"}],"name":"bindReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dailyRemain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dayInRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dayIndex","outputs":[{"internalType":"uint40","name":"","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dayTotalIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"directKpi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"directValidUserVirtualCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getDirectReferrals","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"kpi","type":"uint256"},{"internalType":"uint256","name":"directKpi","type":"uint256"},{"internalType":"uint256","name":"teamKpi","type":"uint256"}],"internalType":"struct Staking.DirectReferrals[]","name":"r","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"}],"name":"getDirectValidUserAllCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"}],"name":"getDirectValidUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getDirectValidUserList","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"lv","type":"uint8"}],"name":"getLevelCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"lv","type":"uint8"}],"name":"getLevelSet","outputs":[{"internalType":"address[]","name":"s","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTeamKpi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getTeamStats","outputs":[{"components":[{"internalType":"uint256","name":"totalTeamKpi","type":"uint256"},{"internalType":"uint256","name":"realTeamKpi","type":"uint256"},{"internalType":"uint256","name":"virtualTeamKpi","type":"uint256"},{"internalType":"uint256","name":"directKpi","type":"uint256"},{"internalType":"uint256","name":"totalDirectValidUser","type":"uint256"},{"internalType":"uint256","name":"realDirectValidUser","type":"uint256"},{"internalType":"uint256","name":"virtualDirectValidUser","type":"uint256"}],"internalType":"struct Staking.TeamStats","name":"s","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"},{"internalType":"uint8","name":"t","type":"uint8"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getUserEarningsByTypePage","outputs":[{"components":[{"internalType":"uint256","name":"earnedAmount","type":"uint256"},{"internalType":"uint8","name":"earnedType","type":"uint8"},{"internalType":"uint8","name":"earnedSvip","type":"uint8"},{"internalType":"uint40","name":"timestamp","type":"uint40"}],"internalType":"struct Staking.Earnings[]","name":"out","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"u","type":"address"},{"internalType":"uint8","name":"t","type":"uint8"}],"name":"getUserEarningsLengthByType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserStakeRecordCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserStakeRecords","outputs":[{"components":[{"internalType":"uint40","name":"stakeTime","type":"uint40"},{"internalType":"uint160","name":"amount","type":"uint160"},{"internalType":"bool","name":"status","type":"bool"},{"internalType":"uint8","name":"stakeIndex","type":"uint8"}],"internalType":"struct Staking.Record[]","name":"records","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"isDirectValidUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isPreacher","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelKpiThresholds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxStakeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxStakeAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"network1In","outputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveURate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"index","type":"uint8"}],"name":"rewardOfSlot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setDayInRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setDirectValidUserVirtualCount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"setMarketingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setReserveURate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"setSvipRewardsAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setTeamVirtuallyInvestValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setValidAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"_amount","type":"uint160"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"uint8","name":"_stakeIndex","type":"uint8"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint160","name":"_amount","type":"uint160"},{"internalType":"uint8","name":"_stakeIndex","type":"uint8"},{"internalType":"uint40","name":"_time","type":"uint40"}],"name":"stakeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"svipRewardsAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"t_supply","outputs":[{"internalType":"uint40","name":"stakeTime","type":"uint40"},{"internalType":"uint160","name":"tamount","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"teamTotalInvestValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"teamVirtuallyInvestValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"unstake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"unstakeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLevel","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userStakeRecord","outputs":[{"internalType":"uint40","name":"stakeTime","type":"uint40"},{"internalType":"uint160","name":"amount","type":"uint160"},{"internalType":"bool","name":"status","type":"bool"},{"internalType":"uint8","name":"stakeIndex","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"validAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawalToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// ✅ 你的合约地址（已内置，不用改）
const CONTRACT_ADDRESS = "0x7E1882b471F627Ba75935BCb12105545Eb8b4227"
// ✅ 必改！链ID：Sepolia=5｜BSC主网=56｜BSC测试网=97｜ETH主网=1
const CHAIN_ID = 56

export default function StakeDapp() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [balance, setBalance] = useState(0)
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeRecords, setStakeRecords] = useState([])
  const [loading, setLoading] = useState(false)

  // 连接TP/MetaMask钱包（通用适配）
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('请安装TP钱包或MetaMask')
      const currentChain = await window.ethereum.request({ method: 'eth_chainId' })
      if (parseInt(currentChain) !== CHAIN_ID) {
        return alert(`请切换到目标网络（链ID:${CHAIN_ID}）`)
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      setContract(contractInstance)
      await getBalance(contractInstance, accounts[0])
      await getStakeRecords(contractInstance, accounts[0])
    } catch (err) {
      console.log('连接钱包失败：', err)
      alert('连接钱包失败，请重试')
    }
  }

  // 查询钱包余额
  const getBalance = async (contractInstance, addr) => {
    try {
      const bal = await contractInstance.balanceOf(addr)
      setBalance(ethers.formatEther(bal))
    } catch (err) {
      console.log('查余额失败：', err)
    }
  }

  // 查询质押记录
  const getStakeRecords = async (contractInstance, addr) => {
    try {
      const records = await contractInstance.getUserStakeRecords(addr)
      const formatRecords = records.map((item, index) => ({
        index,
        stakeTime: new Date(Number(item.stakeTime) * 1000).toLocaleString(),
        amount: ethers.formatEther(item.amount),
        status: item.status ? '已质押' : '已赎回'
      }))
      setStakeRecords(formatRecords)
    } catch (err) {
      console.log('查质押记录失败：', err)
    }
  }

  // 质押操作
  const handleStake = async () => {
    if (!contract || !stakeAmount || stakeAmount <= 0) return alert('请输入有效质押金额')
    setLoading(true)
    try {
      const amount = ethers.parseEther(stakeAmount)
      const tx = await contract.stake(amount, 0, 0)
      alert('质押交易已提交，等待上链确认（约10秒）')
      await tx.wait()
      alert('质押成功！')
      setStakeAmount('')
      await getBalance(contract, account)
      await getStakeRecords(contract, account)
    } catch (err) {
      console.log('质押失败：', err)
      alert('质押失败（余额不足/Gas不足/拒绝交易）')
    } finally {
      setLoading(false)
    }
  }

  // 赎回操作
  const handleUnstake = async (index) => {
    if (!contract) return alert('先连接钱包')
    if (!confirm(`确定赎回第${index+1}笔质押记录吗？`)) return
    setLoading(true)
    try {
      const tx = await contract.unstake(index)
      alert('赎回交易已提交，等待上链确认')
      await tx.wait()
      alert('赎回成功！')
      await getBalance(contract, account)
      await getStakeRecords(contract, account)
    } catch (err) {
      console.log('赎回失败：', err)
      alert('赎回失败（Gas不足/拒绝交易）')
    } finally {
      setLoading(false)
    }
  }

  // 页面渲染
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>质押赎回DApp（TP钱包专用）</h1>
      <p style={tipStyle}>合约地址：{CONTRACT_ADDRESS.slice(0,8)}...{CONTRACT_ADDRESS.slice(-4)}</p>
      
      {!account ? (
        <button onClick={connectWallet} style={btnStyle} disabled={loading}>连接TP/MetaMask钱包</button>
      ) : (
        <div style={accountStyle}>已连接：{account.slice(0,6)}...{account.slice(-4)}</div>
      )}

      {account && contract && (
        <div style={funcAreaStyle}>
          <div style={infoStyle}>
            <p>钱包余额：<span style={boldText}>{balance} 代币</span></p>
          </div>

          <div style={stakeAreaStyle}>
            <h3>质押操作</h3>
            <input
              type="number"
              placeholder="输入质押金额（如1）"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />
            <button onClick={handleStake} style={btnStyle} disabled={loading || !stakeAmount}>
              {loading ? '处理中...' : '确认质押'}
            </button>
          </div>

          <div style={recordAreaStyle}>
            <h3>我的质押记录（点击赎回）</h3>
            {stakeRecords.length === 0 ? (
              <p>暂无质押记录</p>
            ) : (
              <div style={recordListStyle}>
                {stakeRecords.map((item) => (
                  <div key={item.index} style={recordItemStyle}>
                    <p>档位{item.index+1} | 金额：{item.amount}代币 | 状态：{item.status} | 时间：{item.stakeTime}</p>
                    {item.status === '已质押' && (
                      <button onClick={() => handleUnstake(item.index)} style={unstakeBtnStyle} disabled={loading}>赎回</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 手机适配样式（不用改）
const containerStyle = { padding: '1.5rem', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial' }
const titleStyle = { textAlign: 'center', color: '#0070f3', marginBottom: '1rem' }
const tipStyle = { textAlign: 'center', color: '#666', fontSize: '0.9rem' }
const btnStyle = { width: '100%', padding: '1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem' }
const accountStyle = { textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', marginTop: '1rem' }
const funcAreaStyle = { marginTop: '2rem', gap: '1.5rem', display: 'flex', flexDirection: 'column' }
const infoStyle = { padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }
const boldText = { fontWeight: 'bold', color: '#0070f3' }
const stakeAreaStyle = { padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }
const inputStyle = { width: '100%', padding: '0.8rem', margin: '1rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }
const recordAreaStyle = { padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }
const recordListStyle = { gap: '1rem', display: 'flex', flexDirection: 'column', marginTop: '1rem' }
const recordItemStyle = { padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const unstakeBtnStyle = { padding: '0.5rem 1rem', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
