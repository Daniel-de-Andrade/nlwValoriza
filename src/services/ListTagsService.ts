import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagsRespositories = getCustomRepository(TagsRepositories);

    // let tags = await tagsRespositories.find();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));
    const tags = await tagsRespositories.find();

    return classToPlain(tags);

    return tags;
  }
}

export { ListTagsService };
