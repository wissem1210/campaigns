import { Paginator } from '../core/utils/queries';
import { CompaignRepository } from '../data/repositories/compaignRepository';
const campaignRepo = new CompaignRepository();

export const GetCampaign = (req, res) => {
    res.status(200).json({
        count: campaignRepo.iterable.length,
        data: campaignRepo.iterable
    })
}

export const SearchElastic = (req, res) => {
    const { term, page, perPage } = req.query

    var reserches = campaignRepo.iterable
        .filter(c =>
            c.name.toLocaleUpperCase().includes(term)
            || c.duration.toLocaleUpperCase().includes(term)
            || c.status.toLocaleUpperCase().includes(term)
        )

    res.status(200).json(Paginator(reserches, page, perPage))
}


