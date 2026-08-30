// seedDummyData.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Pc = require('./models/Pc');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pc_inventory_db';

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding dummy data');

    // 1. Clear existing data
    await User.deleteMany({});
    await Pc.deleteMany({});
    console.log('🧹 Cleared existing users and PCs');

    // 2. Create Users (1 admin, 5 IT Personnel)
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const userPassword = await bcrypt.hash('user123', saltRounds);

    const adminUser = new User({
      username: 'admin',
      password: adminPassword,
      role: 'IT_Admin',
      fullName: 'System Administrator',
      designation: 'Director (IT Cell)',
    });

    const itPersonnel = [
      { username: 'aarav.sharma', fullName: 'Aarav Sharma', designation: 'Technical Officer' },
      { username: 'vikram.singh', fullName: 'Vikram Singh', designation: 'Scientist B' },
      { username: 'neha.gupta', fullName: 'Neha Gupta', designation: 'Senior Technical Assistant' },
      { username: 'priya.patel', fullName: 'Priya Patel', designation: 'Technical Assistant' },
      { username: 'amit.verma', fullName: 'Amit Verma', designation: 'IT Executive' },
    ];

    const usersToSave = [adminUser];
    for (const p of itPersonnel) {
      usersToSave.push(new User({
        username: p.username,
        password: userPassword,
        role: 'IT_Personnel',
        fullName: p.fullName,
        designation: p.designation,
      }));
    }

    const savedUsers = await User.insertMany(usersToSave);
    console.log(`✅ Saved ${savedUsers.length} users successfully`);

    const adminId = savedUsers.find(u => u.role === 'IT_Admin')._id;
    const personnelIds = savedUsers.filter(u => u.role === 'IT_Personnel').map(u => u._id);

    // 3. Create PCs
    const pcs = [
      // Approved PCs
      {
        pc_id: 1001,
        registerDate: new Date('2026-01-15'),
        networkType: 'DRONA',
        deptName: 'Aerospace Engineering',
        username: 'dr.anil.das',
        deviceName: 'DRDO-AE-WS01',
        macAddress: '00:1A:2B:3C:4D:5E',
        ipAddress: '10.12.45.101',
        osVersion: 'Windows 11 Enterprise',
        cpuSerialNo: 'CPU-INT-99238',
        pcModel: 'HP Z2 Mini G9',
        pcSerialNo: 'SGH82309XJ',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },
      {
        pc_id: 1002,
        registerDate: new Date('2026-02-10'),
        networkType: 'DRONA',
        deptName: 'Cyber Security',
        username: 'scientist.amit',
        deviceName: 'DRDO-CS-WS02',
        macAddress: '1A:2B:3C:4D:5E:6F',
        ipAddress: '10.12.48.55',
        osVersion: 'Windows 10 Pro',
        cpuSerialNo: 'CPU-AMD-88491',
        pcModel: 'Dell OptiPlex 7090',
        pcSerialNo: 'MXL908123A',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },
      {
        pc_id: 1003,
        registerDate: new Date('2026-03-01'),
        networkType: 'CIAG',
        deptName: 'R&D Management',
        username: 'sanjay.kumar',
        deviceName: 'DRDO-RD-WS03',
        macAddress: '2B:3C:4D:5E:6F:7A',
        ipAddress: '10.20.12.80',
        osVersion: 'Windows 11 Pro',
        cpuSerialNo: 'CPU-INT-48201',
        pcModel: 'Lenovo ThinkCentre M70q',
        pcSerialNo: 'PC-LEN-9912A',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: false,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },
      {
        pc_id: 1004,
        registerDate: new Date('2026-03-12'),
        networkType: 'STANDALONE',
        deptName: 'Materials Lab',
        username: 'scientist.kavita',
        deviceName: 'DRDO-ML-WS04',
        macAddress: '3C:4D:5E:6F:7A:8B',
        ipAddress: '192.168.4.12',
        osVersion: 'Windows 10 Enterprise LTSC',
        cpuSerialNo: 'CPU-INT-09381',
        pcModel: 'HP ProDesk 400',
        pcSerialNo: 'SGH00318Y2',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: false,
        ntpStatus: false,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },
      {
        pc_id: 1005,
        registerDate: new Date('2026-04-05'),
        networkType: 'NKN',
        deptName: 'High Performance Computing',
        username: 'hpc.admin',
        deviceName: 'DRDO-HPC-NODE1',
        macAddress: '4D:5E:6F:7A:8B:9C',
        ipAddress: '10.100.8.210',
        osVersion: 'Windows 11 Enterprise',
        cpuSerialNo: 'CPU-XEON-99031',
        pcModel: 'Dell Precision 7865 Tower',
        pcSerialNo: 'D-PREC-88219',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },
      {
        pc_id: 1006,
        registerDate: new Date('2026-05-18'),
        networkType: 'DRONA',
        deptName: 'Electronics & Radar',
        username: 'pranab.sen',
        deviceName: 'DRDO-ER-WS06',
        macAddress: '5E:6F:7A:8B:9C:AD',
        ipAddress: '10.12.55.61',
        osVersion: 'Windows 11 Pro',
        cpuSerialNo: 'CPU-INT-11239',
        pcModel: 'HP EliteDesk 800',
        pcSerialNo: 'SGH55198JK',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Approved',
        approvedBy: adminId,
      },

      // PC with a pending edit request
      {
        pc_id: 1007,
        registerDate: new Date('2026-05-20'),
        networkType: 'DRONA',
        deptName: 'Armament Division',
        username: 'harish.rawat',
        deviceName: 'DRDO-AD-WS07',
        macAddress: '6F:7A:8B:9C:AD:BE',
        ipAddress: '10.12.90.14',
        osVersion: 'Windows 10 Pro',
        cpuSerialNo: 'CPU-AMD-00293',
        pcModel: 'Dell OptiPlex 5090',
        pcSerialNo: 'D-OPT-99120B',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Pending',
        requestedBy: personnelIds[0], // aarav.sharma
        isDeleteRequest: false,
        pendingEdit: {
          ipAddress: '10.12.90.25', // Requested new IP
          osVersion: 'Windows 11 Pro', // Requested OS upgrade
          antivirusStatus: 'Yes',
          firewallEnabled: true,
          wsusImplemented: true,
          ntpStatus: true
        }
      },
      {
        pc_id: 1008,
        registerDate: new Date('2026-06-02'),
        networkType: 'CIAG',
        deptName: 'Naval Systems',
        username: 'capt.rajesh',
        deviceName: 'DRDO-NS-WS08',
        macAddress: '7A:8B:9C:AD:BE:CF',
        ipAddress: '10.20.15.42',
        osVersion: 'Windows 11 Pro',
        cpuSerialNo: 'CPU-INT-88491',
        pcModel: 'Lenovo ThinkCentre Neo 50t',
        pcSerialNo: 'L-NEO-50493',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Pending',
        requestedBy: personnelIds[1], // vikram.singh
        isDeleteRequest: false,
        pendingEdit: {
          username: 'cdr.ramesh', // Change user
          deptName: 'Naval Warfare Systems',
          antivirusStatus: 'Yes',
          firewallEnabled: true,
          wsusImplemented: true,
          ntpStatus: true
        }
      },

      // PC with pending delete request
      {
        pc_id: 1009,
        registerDate: new Date('2026-06-15'),
        networkType: 'STANDALONE',
        deptName: 'Legacy Systems Lab',
        username: 'retired.officer',
        deviceName: 'DRDO-LEGACY-PC',
        macAddress: '8B:9C:AD:BE:CF:D0',
        ipAddress: '192.168.10.99',
        osVersion: 'Windows 7 Enterprise',
        cpuSerialNo: 'CPU-PENT-00122',
        pcModel: 'HP Compaq dc7900',
        pcSerialNo: 'SGHLEGACY9',
        antivirusStatus: 'No',
        firewallEnabled: false,
        wsusImplemented: false,
        ntpStatus: false,
        actionStatus: 'Pending',
        isDeleteRequest: true,
        requestedBy: personnelIds[2], // neha.gupta
      },

      // PC with a pending initial creation request (IT personnel created it)
      {
        pc_id: 1010,
        registerDate: new Date('2026-08-25'),
        networkType: 'DRONA',
        deptName: 'Advanced Simulation Lab',
        username: 'sim.intern',
        deviceName: 'DRDO-SIM-TEMP1',
        macAddress: '9C:AD:BE:CF:D0:E1',
        ipAddress: '10.12.99.115',
        osVersion: 'Windows 11 Pro',
        cpuSerialNo: 'CPU-AMD-99120',
        pcModel: 'HP ZBook Firefly',
        pcSerialNo: 'SGHZBOOK992',
        antivirusStatus: 'Yes',
        firewallEnabled: true,
        wsusImplemented: true,
        ntpStatus: true,
        actionStatus: 'Pending',
        isDeleteRequest: false,
        requestedBy: personnelIds[3], // priya.patel
      }
    ];

    const savedPcs = await Pc.insertMany(pcs);
    console.log(`✅ Saved ${savedPcs.length} PCs successfully`);

    console.log('🎉 Seeding successfully completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding dummy data:', err);
    process.exit(1);
  }
}

seedData();
