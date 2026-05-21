import express from 'express'
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportLeads
} from '../controllers/leadController'
import protect, { adminOnly } from '../middleware/auth'

const router = express.Router()

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Get all leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [New, Contacted, Qualified, Lost]
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [Website, Instagram, Referral]
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, oldest]
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of leads with pagination
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getLeads)

/**
 * @swagger
 * /leads/export/csv:
 *   get:
 *     summary: Export leads as CSV (admin only)
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSV file download
 *       403:
 *         description: Forbidden - admin only
 */
router.get('/export/csv', protect, adminOnly, exportLeads)

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get single lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead details
 *       404:
 *         description: Lead not found
 */
router.get('/:id', protect, getLead)

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - status
 *               - source
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@example.com
 *               status:
 *                 type: string
 *                 enum: [New, Contacted, Qualified, Lost]
 *               source:
 *                 type: string
 *                 enum: [Website, Instagram, Referral]
 *     responses:
 *       201:
 *         description: Lead created successfully
 */
router.post('/', protect, createLead)

/**
 * @swagger
 * /leads/{id}:
 *   put:
 *     summary: Update a lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *               source:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lead updated successfully
 */
router.put('/:id', protect, updateLead)

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Delete a lead (admin only)
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       403:
 *         description: Forbidden - admin only
 */
router.delete('/:id', protect, adminOnly, deleteLead)

export default router