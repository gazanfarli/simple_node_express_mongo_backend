const Employee = require("../model/Employee");


const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ message: 'No employees found' });
  res.json(employees);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: 'Employee ID required' });
  const employee = await Employee.findOne({ _id: req.params.id });

  if (!employee) {
    return res.status(204).json({
      message: `Employee ID ${req.params.id} not found`,
    });
  }

  res.json(employee);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return res.status(400).json({ message: 'First and Last name are required' });
  }

  try {
    const newEmployee = await Employee.create({
      firstname: firstname,
      lastname: lastname,
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'ID parameter is required' });
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res.status(204).json({
      message: `No employee matches ID ${req.body.id}`,
    });
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'Employee ID required' })

  const employee = Employee.findOne({ _id: req.body.id });
  if (!employee) {
    return res.status(204).json({
      message: `No employee matches ID ${req.body.id}`,
    });
  }

  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
